import React from 'react';
import { Route, NavLink, withRouter } from 'react-router-dom';
import axios from 'axios';

import Home from './components/Home';
import AvengersList from './components/AvengersList';
import Avenger from './components/Avenger';
import AvengerForm from './components/AvengerForm';

// import avengersData from '../data/avengersData';
//  thumbnail https://terrigen-cdn-dev.marvel.com/content/prod/2x/010ant_com_crd_01.jpg
// When ex-criminal Scott Lang turned to his illicit skills in order to save his daughter’s life, he unexpectedly became the size-shifting, insect-commanding Super Hero known as Ant-Man!
// Ant-Man, Captain America: Civil War

import './App.css';

const blankFormValues = {
  name: '',
  nickname: '',
  description: '',
  thumbnail: '',
  img: '',
  movies: [],
};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      avengersData: [],
      avenger: {
        name: '',
        nickname: '',
        description: '',
        thumbnail: '',
        img: '',
        movies: [],
      },
      isUpdating: false,
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/avengers')
      .then(response => {
        this.setState({ avengersData: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleChange = event => {
    if (event.target.name === 'movies') {
      const movies = event.target.value.split(', ');
      this.setState({
        avenger: {
          ...this.state.avenger,
          movies, // same as movies: movies
        }
      });
    } else {
      this.setState({
        avenger: {
          ...this.state.avenger,
          [event.target.name]: event.target.value,
        }
      });
    }
  }

  handleAddNewAvenger = event => {
    event.preventDefault();
    console.log('firing')
    axios.post('http://localhost:5000/avengers', this.state.avenger)
      .then(response => this.setState({ avengersData: response.data, avenger: blankFormValues }))
  }

  handleDeleteAvenger = avengerId => {
    return axios.delete(`http://localhost:5000/avengers/${avengerId}`)
      .then(response => this.setState({ avengersData: response.data }));
  }

  goToUpdateAvengerForm = (event, id) => {
    event.preventDefault();
    const avengerToUpdate = this.state.avengersData.find(avenger => avenger.id == id);
    this.setState({ isUpdating: true, avenger: avengerToUpdate }, () => this.props.history.push('/avenger-form'));
  }

  handleUpdateAvenger = avengerId => {
    axios.put(`http://localhost:5000/avengers/${avengerId}`, this.state.avenger)
      .then(response => {
        this.setState({
          avengersData: response.data, 
          isUpdating: false,
          avenger: blankFormValues,
        });
        this.props.history.push(`/avengers/${avengerId}/info`);
      });
  }

  render() {
    return (
      <div className="App">
        <ul className="navbar">
          <li>
            <NavLink exact to="/" activeClassName="activeNavButton">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/avengers" activeClassName="activeNavButton">
              Avengers
            </NavLink>
          </li>
          <li>
            <NavLink to="/avenger-form" activeClassName="activeNavButton">
              Add New
            </NavLink></li>
        </ul>
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/avengers"
          render={props => (
            <AvengersList {...props} avengersList={this.state.avengersData} />
          )}
        />
        <Route
          path="/avengers/:avengerId"
          render={props => (
            <Avenger 
              {...props} 
              avengersList={this.state.avengersData} 
              handleDeleteAvenger={this.handleDeleteAvenger}
              goToUpdateAvengerForm={this.goToUpdateAvengerForm}
            /> // spread in props --> same as "match={props.match} location={props.location} history={props.history}"
          )}
        />
        <Route
          path="/avenger-form"
          render={props => (
            <AvengerForm 
              {...props} 
              avenger={this.state.avenger} 
              handleAddNewAvenger={this.handleAddNewAvenger}
              handleChange={this.handleChange}
              handleUpdateAvenger={this.handleUpdateAvenger}
              isUpdating={this.state.isUpdating} 
            /> // spread in props --> same as "match={props.match} location={props.location} history={props.history}"
          )}
        />
      </div>
    );
  }
}

export default withRouter(App);

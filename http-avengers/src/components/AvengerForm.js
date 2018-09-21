import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

function AvengerForm(props) {
    function handleSubmit(event) {
        event.preventDefault();
        
        if (props.isUpdating) {
            props.handleUpdateAvenger(props.avenger.id);
        } else {
            props.handleAddNewAvenger();
        }
    }

  return (
    <Fragment>
        <h2>{props.isUpdating ? 'Update Avenger' : 'Add New Avenger'}</h2>
        <form>
            <div className="group">
                <input 
                    type="text" 
                    value={props.avenger.name} 
                    name="name" 
                    onChange={props.handleChange} 
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Name</label>
            </div>
            <div className="group">
                <input 
                    type="text" 
                    value={props.avenger.nickname} 
                    name="nickname" 
                    onChange={props.handleChange} 
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Nickname</label>
            </div>
            <div className="group">
                <input 
                    type="text" 
                    value={props.avenger.description} 
                    name="description" 
                    onChange={props.handleChange} 
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Description</label>
            </div>
            <div className="group">
                <input 
                    type="text" 
                    value={props.avenger.thumbnail} 
                    name="thumbnail" 
                    onChange={props.handleChange} 
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Thumbnail</label>
            </div>
            <div className="group">
                <input 
                    type="text" 
                    value={props.avenger.img} 
                    name="img" 
                    onChange={props.handleChange} 
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Img</label>
            </div>
            <div className="group">
                <input 
                    type="text" 
                    value={props.avenger.movies.join(', ')} 
                    name="movies" 
                    onChange={props.handleChange} 
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Movies (comma delimited list)</label>
            </div>
            <button className="material-button-raised" onClick={handleSubmit}>Submit</button>
        </form>
    </Fragment>
  );
}

AvengerForm.propTypes = {
    avenger: PropTypes.shape({
        name: PropTypes.string,
        nickname: PropTypes.string,
        description: PropTypes.string,
        thumbnail: PropTypes.string,
        img: PropTypes.string,
        movies: PropTypes.arrayOf(PropTypes.string),
    }),
    isUpdating: PropTypes.bool,
    handleAddNewAvenger: PropTypes.func,
    handleChange: PropTypes.func,
    handleUpdateAvenger: PropTypes.func,
}

export default AvengerForm;

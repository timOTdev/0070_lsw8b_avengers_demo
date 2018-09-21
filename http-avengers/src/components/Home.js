import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
        <h1>Avengers Database</h1>
        <h4>Enter below:</h4>
        <p>Warning: this data is classified!</p>

        <Link to="/avengers">Enter</Link>
  </div>
  );
}

export default Home;

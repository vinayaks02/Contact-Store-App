import React from 'react';

const Home = () => {
  return (
    <div className="container my-4" style={{backgroundColor:'lightcoral', padding:'40px'}}>
      <div className="jumbotron">
        <h1 className="display-4" style={{paddingTop:'50px'}}><center><b>Welcome to Contact Store App</b></center></h1>
        <h6 style={{paddingTop:'30px', textAlign:'center'}}>
          This is a simple web application for managing Contacts. You can add,
          edit, and delete user information using the provided features.
        </h6>
        <hr className="my-4" />
        <h6 style={{paddingTop:'30px', textAlign:'center'}}>
          Built with React.js for the frontend and Node.js, Express, and MongoDB
          for the backend.
        </h6>
        <p className="lead" style={{paddingTop:'30px', textAlign:'center'}}>
          <a
            className="btn btn-primary btn-lg"
            href="/read"
            role="button"
          >
            View All Contacts
          </a>
        </p>
      </div>
    </div>
  );
};

export default Home;

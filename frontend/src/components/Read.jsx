import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Read = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // State for search term input

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:5000/users");
      const result = await response.json();

      if (!response.ok) {
        setError(result.error);
      } else {
        setError("");
        setData(result);
      }
    } catch (error) {
      setError("An error occurred while fetching data.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/users/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error);
      } else {
        setError("");
        setSuccess("Data Deleted Successfully");

        setTimeout(() => {
          setSuccess("");
          getData();
        }, 1000);
      }
    } catch (error) {
      setError("An error occurred while deleting data.");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Filter the data based on the search term
  const filteredData = data.filter((ele) =>
    ele.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container my-4 bg-light py-4">
      <h2 className="text-center mb-4">Contacts Saved</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {/* Search input and button */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="row" style={{ backgroundColor: "black", padding: "30px" }}>
        {filteredData.map((ele) => (
          <div key={ele._id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div className="card bg-info text-black h-100">
              <div className="card-body" style={{ backgroundColor: 'lightcoral' }}>
                <h5 className="card-title"><center>{ele.name}</center></h5>
                <h6 className="card-subtitle mb-2" style={{ paddingBottom: '10px' }}><center>{ele.email}</center></h6>
                <p className="card-text"><b>Phone</b>: {ele.phoneNumber}</p>
                <p className="card-text"><b>Address</b>: {ele.address}</p>
                <p className="card-text"><b>Work Info</b>: {ele.workInfo}</p>
                <p className="card-text"><b>Note</b>: {ele.note}</p>
                
                {/* Buttons at the bottom of the card */}
                <div className="mt-auto d-flex justify-content-between align-items-center">
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(ele._id)}
                  >
                    Delete
                  </button>
                  <Link
                    to={{
                      pathname: `/update/${ele._id}`,
                      state: { userData: ele },
                    }}
                    className="btn btn-dark text-info"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Read;

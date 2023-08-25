import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [workInfo, setWorkInfo] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const getSingleUser = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:5000/users/${id}`);
      const result = await response.json();

      if (!response.ok) {
        setError(result.error);
      } else {
        setError("");
        setName(result.name);
        setEmail(result.email);
        setAge(result.age);
        setPhoneNumber(result.phoneNumber);
        setAddress(result.address);
        setWorkInfo(result.workInfo);
        setNote(result.note);
      }
    } catch (error) {
      setError("An error occurred while fetching user data.");
    }
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedUser = {
      name,
      email,
      age,
      phoneNumber,
      address,
      workInfo,
      note,
    };

    try {
      const response = await fetch(`http://localhost:5000/users/${id}`, {
        method: "PATCH",
        body: JSON.stringify(updatedUser),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const result = await response.json();
        setError(result.error);
      } else {
        setError("");
        setSuccess("Data Updated Successfully");
        setTimeout(() => {
          setSuccess("");
          navigate("/Home");
        }, 1000);
      }
    } catch (error) {
      setError("An error occurred while updating user data.");
    }
  };

  useEffect(() => {
    getSingleUser();
  }, [getSingleUser]);

  return (
    <div className="container my-2">
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <h2 className="text-center">Edit The Data</h2>

      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input
            type="tel"
            className="form-control"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Work Info</label>
          <input
            type="text"
            className="form-control"
            value={workInfo}
            onChange={(e) => setWorkInfo(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Note</label>
          <textarea
            className="form-control"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Update;
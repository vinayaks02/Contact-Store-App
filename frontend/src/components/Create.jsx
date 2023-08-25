import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [workInfo, setWorkInfo] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false); // State for showing success modal

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const addUser = {
      name,
      email,
      age,
      phoneNumber,
      address,
      workInfo,
      note,
    };

    try {
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        body: JSON.stringify(addUser),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error);
      } else {
        setError("");
        setName("");
        setEmail("");
        setAge(0);
        setPhoneNumber("");
        setAddress("");
        setWorkInfo("");
        setNote("");
        setShowSuccessModal(true); // Show success modal after successful submission
      }
    } catch (error) {
      setError("An error occurred while submitting data.");
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false); // Close the modal
    navigate("/read"); // Navigate to the home page
  };


  return (
    <div className="container my-2">
      {error && <div className="alert alert-danger">{error}</div>}
      <h2 className="text-center">ENTER DATA</h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Age */}
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        {/* Phone Number */}
        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input
            type="text"
            className="form-control"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        {/* Address */}
        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        {/* Work Info */}
        <div className="mb-3">
          <label className="form-label">Work Info</label>
          <input
            type="text"
            className="form-control"
            value={workInfo}
            onChange={(e) => setWorkInfo(e.target.value)}
          />
        </div>

        {/* Note */}
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

      {/* Success Modal */}
      <div
        className={`modal ${showSuccessModal ? "show" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{ display: showSuccessModal ? "block" : "none" }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Success</h5>
              <button
                type="button"
                className="close"
                onClick={handleCloseModal} // Close modal and navigate to the home page
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">Data has been saved successfully.</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleCloseModal} // Close modal and navigate to the home page
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
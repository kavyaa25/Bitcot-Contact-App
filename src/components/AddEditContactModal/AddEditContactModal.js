import React, { useState, useEffect } from "react";
import "./AddEditContactModal.css";

const AddEditContactModal = ({ mode, contact = {}, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    id: null,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (mode !== "add" && contact) {
      setFormData({
        firstName: contact.firstName || "",
        lastName: contact.lastName || "",
        email: contact.email || "",
        phone: contact.phone || "",
        id: contact.id || null,
      });
    }
  }, [mode, contact]);

  const validate = () => {
    const errs = {};
    if (!formData.firstName.trim()) errs.firstName = "First name is required";
    if (!formData.lastName.trim()) errs.lastName = "Last name is required";
    if (!formData.email.trim())
      errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errs.email = "Invalid email address";
    if (!formData.phone.trim())
      errs.phone = "Phone is required";
    else if (!/^\d{10}$/.test(formData.phone))
      errs.phone = "Phone must be 10 digits";
    return errs;
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      onSave(formData);
    } else {
      setErrors(validationErrors);
    }
  };

  if (mode === "view") {
    return (
      <div className="modal-backdrop">
        <div className="modal">
          <div className="modal-header">
            <h5 className="modal-title">View Contact Details</h5>
            <button onClick={onClose} className="btn-close" aria-label="Close">
              ✖
            </button>
          </div>
          <div className="modal-body">
            <p><b>First Name:</b> {formData.firstName}</p>
            <p><b>Last Name:</b> {formData.lastName}</p>
            <p><b>Email:</b> {formData.email}</p>
            <p><b>Phone:</b> {formData.phone}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">
          <h5 className="modal-title">{mode === "add" ? "Add Contact" : "Edit Contact"}</h5>
          <button onClick={onClose} className="btn-close" aria-label="Close">
            ✖
          </button>
        </div>
        <form className="modal-body" onSubmit={handleSubmit} noValidate>
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={errors.firstName ? "is-invalid" : ""}
          />
          {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}

          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={errors.lastName ? "is-invalid" : ""}
          />
          {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}

          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "is-invalid" : ""}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}

          <input
            type="text"
            placeholder="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={errors.phone ? "is-invalid" : ""}
          />
          {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}

          <button type="submit">{mode === "add" ? "Add Contact" : "Update Contact"}</button>
        </form>
      </div>
    </div>
  );
};

export default AddEditContactModal;

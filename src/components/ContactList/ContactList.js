import React from "react";
import "./ContactList.css";

const ContactList = ({ contacts, onDelete, onEdit, onView }) => {
  if (contacts.length === 0) return <p>No contacts found.</p>;

  return (
    <table className="contact-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {contacts.map((c) => (
          <tr key={c.id}>
            <td>{c.firstName} {c.lastName}</td>
            <td>{c.email}</td>
            <td>{c.phone}</td>
            <td>
              <button 
                className="btn btn-info" 
                onClick={() => onView(c)} 
                title="View"
                aria-label="View Contact"
              >👁️</button>
              <button 
                className="btn btn-warning" 
                onClick={() => onEdit(c)} 
                title="Edit"
                aria-label="Edit Contact"
              >✏️</button>
              <button 
                className="btn btn-danger" 
                onClick={() => onDelete(c.id)} 
                title="Delete"
                aria-label="Delete Contact"
              >🗑️</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ContactList;

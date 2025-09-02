import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import ContactList from "./components/ContactList/ContactList";
import AddEditContactModal from "./components/AddEditContactModal/AddEditContactModal";
import SearchBar from "./components/SearchBar/SearchBar";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";
const CONTACTS_API =
  "https://raw.githubusercontent.com/BitcotDev/fresher-machin-test/main/json/sample.json";
const App = () => {
  const [contacts, setContacts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [mode, setMode] = useState("add");
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    async function fetchContacts() {
      try {
        const response = await fetch(CONTACTS_API);
        const data = await response.json();
        setContacts(data);
      } catch (error) {
        console.error("Error fetching contacts", error);
      }
    }
    fetchContacts();
  }, []);
  const deleteContact = (id) =>
    setContacts(contacts.filter((c) => c.id !== id));
  const openAddModal = () => {
    setMode("add");
    setSelectedContact(null);
    setModalOpen(true);
  };
  const openEditModal = (contact) => {
    setMode("edit");
    setSelectedContact(contact);
    setModalOpen(true);
  };
  const openViewModal = (contact) => {
    setMode("view");
    setSelectedContact(contact);
    setModalOpen(true);
  };
  const handleSave = (contactData) => {
    if (mode === "add") {
      const newContact = { ...contactData, id: uuidv4() };
      setContacts([...contacts, newContact]);
    } else if (mode === "edit") {
      setContacts(
        contacts.map((c) => (c.id === contactData.id ? contactData : c))
      );
    }
    setModalOpen(false);
  };
  const filteredContacts = contacts.filter((contact) => {
    const firstName = contact.firstName || "";
    const lastName = contact.lastName || "";
    const phone = contact.phone || "";
    const fullName = `${firstName} ${lastName}`.toLowerCase();
    const lowerSearchTerm = searchTerm.toLowerCase();
    return fullName.includes(lowerSearchTerm) || phone.includes(searchTerm);
  });
  return (
    <div className="container mt-5">
      <h1 className="mb-4">Bitcot Contact Management</h1>
      <ThemeToggle />
      <button className="btn btn-primary m-5" onClick={openAddModal}>
        Add Contact
      </button>
      <br />
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <ContactList
        contacts={filteredContacts}
        onDelete={deleteContact}
        onEdit={openEditModal}
        onView={openViewModal}
      />

      {modalOpen && (
        <AddEditContactModal
          mode={mode}
          contact={selectedContact}
          onSave={handleSave}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};
export default App;

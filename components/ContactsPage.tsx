import React, { useState, useEffect } from 'react';
import QuickAdd from './QuickAdd';
import ContactsTable from './ContactsTable';

const ContactsPage: React.FC = () => {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    try {
      const response = await fetch('/api/contacts');
      const data = await response.json();
      setContacts(data.contacts);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="container mx-auto flex flex-col items-center min-h-screen">
      {/* Pass fetchContacts to QuickAdd */}
      <QuickAdd fetchContacts={fetchContacts} />
      {/* Pass contacts and fetchContacts to ContactsTable */}
      <ContactsTable contacts={contacts} fetchContacts={fetchContacts} />
    </div>
  );
};

export default ContactsPage;
import React, { useState } from 'react';
import { TrashIcon } from '@heroicons/react/outline';
import ViewContact from './ViewContact';

interface Contact {
  _id: string;
  name: string;
  information: string;
}

interface ContactsTableProps {
  contacts: Contact[];
  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
}

const ContactsTable: React.FC<ContactsTableProps> = ({ contacts, setContacts }) => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [contactToDelete, setContactToDelete] = useState<Contact | null>(null);

  const handleDelete = async (id: string) => {
    // Find the contact to delete
    const contact = contacts.find(contact => contact._id === id);
    if (!contact) return;

    // Optimistically update the UI
    setContacts(prevContacts => prevContacts.filter(contact => contact._id !== id));

    // Close the delete confirmation modal instantly
    setContactToDelete(null);

    try {
      const response = await fetch('/api/contacts', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        // If deletion failed, revert the UI
        setContacts(prevContacts => [...prevContacts, contact]);
        console.error('Error deleting contact');
      }
    } catch (error) {
      // Revert the UI if there's an error
      setContacts(prevContacts => [...prevContacts, contact]);
      console.error('Error deleting contact:', error);
    }
  };

  const handleSave = async (updatedContact: Contact) => {
    // Optimistically update the contact in the local state
    setContacts(prevContacts =>
      prevContacts.map(contact =>
        contact._id === updatedContact._id ? updatedContact : contact
      )
    );

    // Close the modal instantly
    setSelectedContact(null);

    try {
      const response = await fetch('/api/contacts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedContact),
      });

      if (!response.ok) {
        throw new Error('Error updating contact');
      }
    } catch (error) {
      console.error('Error updating contact:', error);
      // Optionally, you can revert the optimistic update if needed
    }
  };

  return (
    <div className="overflow-x-auto w-full">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Information</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact._id}>
              <td className="whitespace-nowrap">
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => setSelectedContact(contact)}
                >
                  {contact.name}
                </button>
              </td>
              <td>
                {contact.information
                  .split(',')
                  .filter((fact) => fact.trim() !== '')
                  .slice(0, 2)
                  .map((fact, index) => (
                    <span key={index} className="badge badge-ghost mr-1 mb-1">
                      {fact.trim()}
                    </span>
                  ))}
                {contact.information
                  .split(',')
                  .filter((fact) => fact.trim() !== '').length > 2 && (
                  <span className="badge badge-ghost">...</span>
                )}
              </td>
              <td className="text-right">
                <div className="flex items-center justify-end space-x-2">
                  <button
                    className="btn btn-sm btn-outline"
                    onClick={() => setSelectedContact(contact)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => setContactToDelete(contact)}
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* View Contact Modal */}
      <ViewContact
        contact={selectedContact}
        onClose={() => setSelectedContact(null)}
        onSave={handleSave}
      />

      {/* Delete Confirmation Modal */}
      {contactToDelete && (
        <>
          <input type="checkbox" id="delete-modal" className="modal-toggle" checked readOnly />
          <div className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Confirm Deletion</h3>
              <p className="py-4">
                Are you sure you want to permanently delete{' '}
                <span className="font-semibold">{contactToDelete.name}</span>?
              </p>
              <div className="modal-action">
                <button
                  className="btn"
                  onClick={() => setContactToDelete(null)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-error"
                  onClick={() => handleDelete(contactToDelete._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ContactsTable;


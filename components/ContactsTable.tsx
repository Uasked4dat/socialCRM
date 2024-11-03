import React, { useState } from 'react';
import { TrashIcon } from '@heroicons/react/outline';

interface Contact {
  _id: string;
  name: string;
  information: string;
}

interface ContactsTableProps {
  contacts: Contact[];
  fetchContacts: () => void;
}

const ContactsTable: React.FC<ContactsTableProps> = ({ contacts, fetchContacts }) => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch('/api/contacts', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        // Refresh contacts after deletion
        fetchContacts();
      } else {
        console.error('Failed to delete contact');
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const handleContactClick = (contact: Contact) => {
    setSelectedContact(contact);
  };

  return (
    <div className="w-full relative">
      <div className="bg-base-100 pr-4 pt-4 rounded-xl shadow-lg flex flex-col pb-4">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact._id}>
                  <td>
                    <button
                      onClick={() => handleContactClick(contact)}
                      className="text-primary hover:text-primary-focus font-semibold"
                    >
                      {contact.name}
                    </button>
                  </td>
                  <td className="p-0 text-right">
                    <button
                      className="btn btn-sm text-black font-bold flex items-center justify-center ml-auto"
                      style={{
                        backgroundColor: '#941010',
                        width: '2rem',
                        height: '2rem',
                        minWidth: '2rem',
                        minHeight: '2rem',
                        padding: 0,
                      }}
                      onClick={() => handleDelete(contact._id)}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Contact Details Modal */}
      {selectedContact && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="text-xl font-bold">{selectedContact.name}</h2>
            <p className="mt-4">{selectedContact.information}</p>
            <div className="modal-action">
              <button className="btn" onClick={() => setSelectedContact(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactsTable;

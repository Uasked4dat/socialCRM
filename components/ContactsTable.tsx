import React, { useState, useRef } from 'react';
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch('/api/contacts', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        fetchContacts();
      } else {
        console.error('Error deleting contact');
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
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
              <td className="whitespace-nowrap">{contact.name}</td>
              <td>
                {contact.information.split(',').filter(fact => fact.trim() !== '').slice(0, 2).map((fact, index) => (
                  <span key={index} className="badge badge-ghost mr-1 mb-1">
                    {fact.trim()}
                  </span>
                ))}
                {contact.information.split(',').filter(fact => fact.trim() !== '').length > 2 && (
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
                    onClick={() => handleDelete(contact._id)}
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedContact && (
        <>
          <input type="checkbox" id="contact-modal" className="modal-toggle" checked readOnly />
          <div className="modal">
            <div className="modal-box">
              <h2 className="font-bold text-xl mb-4">{selectedContact.name}</h2>
              <ul className="list-disc list-inside mb-4">
                {selectedContact.information.split(',').filter(fact => fact.trim() !== '').map((fact, index) => (
                  <li key={index}>{fact.trim()}</li>
                ))}
              </ul>
              <div className="modal-action">
                <button className="btn" onClick={() => setSelectedContact(null)}>
                  Close
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

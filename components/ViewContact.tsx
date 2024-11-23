import React, { useState, useEffect } from 'react';

interface Contact {
  _id: string;
  name: string;
  information: string;
}

interface ViewContactProps {
  contact: Contact | null;
  onClose: () => void;
  onSave: (updatedContact: Contact) => void;
}

const ViewContact: React.FC<ViewContactProps> = ({ contact, onClose, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [information, setInformation] = useState(contact?.information || '');

  useEffect(() => {
    if (contact && isEditing) {
      setInformation(contact.information);
    }
  }, [contact, isEditing]);

  if (!contact) return null;

  const handleSave = () => {
    const updatedContact = { ...contact, information };
    onSave(updatedContact);
    setIsEditing(false);
  };

  return (
    <>
      <input type="checkbox" id="contact-modal" className="modal-toggle" checked readOnly />
      <div className="modal">
        <div className="modal-box">
          <h2 className="font-bold text-xl mb-4">{contact.name}</h2>
          {isEditing ? (
            <textarea
              className="textarea textarea-bordered w-full mb-4"
              value={information}
              onChange={(e) => setInformation(e.target.value)}
            />
          ) : (
            <ul className="list-disc list-inside mb-4">
              {contact.information
                .split(',')
                .filter((fact) => fact.trim() !== '')
                .map((fact, index) => (
                  <li key={index}>{fact.trim()}</li>
                ))}
            </ul>
          )}
          <div className="modal-action">
            {isEditing ? (
              <>
                <button className="btn" onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSave}>
                  Save
                </button>
              </>
            ) : (
              <>
                <button className="btn" onClick={() => setIsEditing(true)}>
                  Edit
                </button>
                <button className="btn" onClick={onClose}>
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewContact;
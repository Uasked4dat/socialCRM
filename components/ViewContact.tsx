import React from 'react';

interface Contact {
  _id: string;
  name: string;
  information: string;
}

interface ViewContactProps {
  contact: Contact | null;
  onClose: () => void;
}

const ViewContact: React.FC<ViewContactProps> = ({ contact, onClose }) => {
  if (!contact) return null;

  return (
    <>
      <input type="checkbox" id="contact-modal" className="modal-toggle" checked readOnly />
      <div className="modal">
        <div className="modal-box">
          <h2 className="font-bold text-xl mb-4">{contact.name}</h2>
          <ul className="list-disc list-inside mb-4">
            {contact.information
              .split(',')
              .filter((fact) => fact.trim() !== '')
              .map((fact, index) => (
                <li key={index}>{fact.trim()}</li>
              ))}
          </ul>
          <div className="modal-action">
            <button className="btn" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewContact;
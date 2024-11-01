import React, { useEffect, useState } from 'react';
import { TrashIcon } from '@heroicons/react/outline';

const ContactsTable: React.FC = () => {
    const [contacts, setContacts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newContact, setNewContact] = useState({ name: '', information: '' });
    const [selectedContact, setSelectedContact] = useState<{ name: string; information: string } | null>(null);

    // Separate the fetchContacts function to be used in both initial load and refreshing after adding a contact
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
        fetchContacts(); // Initial load
    }, []);

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewContact({ ...newContact, [name]: value });
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/contacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newContact),
            });
            if (response.ok) {
                await fetchContacts(); // Refresh contacts after adding a new one
                setNewContact({ name: '', information: '' });
                toggleModal();
            } else {
                console.error('Failed to add contact');
            }
        } catch (error) {
            console.error('Error adding contact:', error);
        }
    };

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
                setContacts(contacts.filter((contact) => contact._id !== id));
            } else {
                console.error('Failed to delete contact');
            }
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    };

    const handleContactClick = (contact: { name: string; information: string }) => {
        setSelectedContact(contact);
    };

    return (
        <div className="container mx-auto flex flex-col items-center min-h-screen">
            <div className="w-full relative">
                <div className="bg-base-100 pr-4 pt-4 rounded-xl shadow-lg flex flex-col pb-20">
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
                    <button
                        className="btn btn-primary absolute bottom-4 right-4"
                        onClick={toggleModal}
                    >
                        Add Contact
                    </button>
                </div>
            </div>

            {/* Add Contact Modal */}
            {isModalOpen && (
                <div className="modal modal-open">
                    <div className="modal-box w-11/12 max-w-3xl">
                        <h3 className="font-bold text-lg mb-4">Add New Contact</h3>
                        <form onSubmit={handleFormSubmit}>
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    className="input input-bordered w-full"
                                    value={newContact.name}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="text"
                                    name="information"
                                    placeholder="Information"
                                    className="input input-bordered w-full"
                                    value={newContact.information}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="modal-action mt-6">
                                <button type="button" className="btn" onClick={toggleModal}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

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

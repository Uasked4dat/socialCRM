import React, { useEffect, useState } from 'react';

const ContactsTable: React.FC = () => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await fetch('/api/contacts');
                const data = await response.json();
                setContacts(data.contacts);
            } catch (error) {
                console.error('Error fetching contacts:', error);
            }
        };

        fetchContacts();
    }, []);

    return (
        <div className="container mx-auto flex flex-col items-center min-h-screen">
            <div className="w-full max-w-2xl relative">
                <div className="bg-base-100 p-6 rounded-xl shadow-lg flex flex-col pb-20">
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Information</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contacts.map((contact) => (
                                    <tr key={contact._id}>
                                        <td>{contact._id}</td>
                                        <td>{contact.name}</td>
                                        <td>{contact.information}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <button className="btn btn-primary absolute bottom-4 right-4">
                        Add Contact
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContactsTable;
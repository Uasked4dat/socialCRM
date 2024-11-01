import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuickAdd: React.FC = () => {
  const [entry, setEntry] = useState<string>('');
  const [contacts, setContacts] = useState([]);

  // Fetch all contacts on component load
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('/api/contacts');
        setContacts(response.data.contacts);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };
    fetchContacts();
  }, []);

  const handleQuickAdd = async () => {
    if (!entry.trim()) return;
  
    const basePrompt = "Extract the names of people I interacted with and provide a list of facts about a specific person in an array.";
    const fullPrompt = `${basePrompt}\n\n${entry}`;
  
    try {
      const response = await axios.post('/api/contacts/generate', { prompt: fullPrompt });
      const structuredResponse = response.data.structuredResponse;
  
      for (const person of structuredResponse) {
        const { name, content: factoids } = person;
        const newInformation = factoids.join(', ');
  
        const existingContact = contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase());
  
        await axios.post('/api/contacts', { name, information: newInformation });
      }
  
      setEntry(''); // Clear input after processing
  
      // Force a full page reload to refresh contacts
      window.location.reload();
  
    } catch (error) {
      console.error('Error adding quick entry:', error);
    }
  };
  

  return (
    <div className="container mx-auto flex flex-col items-center min-h-screen">
      <div className="w-full">
        <div className="bg-base-100 rounded-xl shadow-lg p-4 mb-6 flex flex-col">
          <textarea
            className="textarea textarea-bordered w-full mb-4 resize-none h-32"
            placeholder="Quickly add information about a person..."
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
          />
          <button
            className="btn btn-primary mt-4 self-end"
            onClick={handleQuickAdd}
          >
            Process Entry
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickAdd;

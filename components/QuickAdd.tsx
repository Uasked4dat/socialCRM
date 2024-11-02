import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PreviewEntries from './PreviewEntries'; // Import the preview component

const QuickAdd: React.FC = () => {
  const [entry, setEntry] = useState<string>('');
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [structuredResponse, setStructuredResponse] = useState(null); // Store API response
  const [showPreview, setShowPreview] = useState<boolean>(false); // Toggle preview

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
  
    const basePrompt = "“Identify the names of people I interacted with and summarize key facts about each person as a list of brief descriptors (e.g., ‘interested in quantum physics’ instead of ‘we talked about quantum physics’). Only include relevant details about interests, personality traits, or notable topics.”";
    const fullPrompt = `${basePrompt}\n\n${entry}`;
  
    setIsLoading(true);
    try {
      const response = await axios.post('/api/contacts/generate', { prompt: fullPrompt });
      setStructuredResponse(response.data.structuredResponse); // Store the API response
      setShowPreview(true); // Show preview after receiving the response
      setEntry(''); // Clear input after processing
    } catch (error) {
      console.error('Error adding quick entry:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirm = (updatedEntries: Array<{ name: string; information: string }>) => {
    // Handle confirmation and update database with final entries
    updatedEntries.forEach(async (entry) => {
      await axios.post('/api/contacts', entry);
    });
    setShowPreview(false); // Close preview
    window.location.reload(); // Refresh the page after saving
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
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              'Process Entry'
            )}
          </button>
        </div>
      </div>

      {/* Render PreviewComponent when showPreview is true */}
      {showPreview && structuredResponse && (
        <PreviewEntries
          structuredResponse={structuredResponse}
          existingContacts={contacts}
          onClose={() => setShowPreview(false)}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
};

export default QuickAdd;

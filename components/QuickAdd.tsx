import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PreviewEntries from './PreviewEntries';

// Define the Contact interface
interface Contact {
  _id: string;
  name: string;
  information: string;
}

interface QuickAddProps {
  contacts: Contact[];
  fetchContacts: () => void;
}

const QuickAdd: React.FC<QuickAddProps> = ({ contacts, fetchContacts }) => {
  const [entry, setEntry] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [structuredResponse, setStructuredResponse] = useState([]);

  const handleQuickAdd = async () => {
    if (!entry.trim()) return;

    const basePrompt = "Identify names and summarize...";
    const fullPrompt = `${basePrompt}\n\n${entry}`;

    setIsLoading(true);
    try {
      const response = await axios.post('/api/contacts/generate', { prompt: fullPrompt });
      setStructuredResponse(response.data.structuredResponse);
      setShowPreview(true);
      setEntry('');
    } catch (error) {
      console.error('Error adding quick entry:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirm = async (updatedEntries: Array<{ name: string; information: string }>) => {
    try {
      await axios.post('/api/contacts', { entries: updatedEntries });
      setShowPreview(false); // Close preview
      fetchContacts(); // Refresh contacts after saving
    } catch (error) {
      console.error('Error saving entries:', error);
    }
  };

  return (
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

      {showPreview && (
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

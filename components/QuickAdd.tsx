import React, { useState } from 'react';
import axios from 'axios';
import PreviewEntries from './PreviewEntries';
import MicrophoneButton from './MicrophoneButton';

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

    const basePrompt = "Identify the names of people and provide an array of associated facts for each person. For each person, return their full name separately and an array of concise facts about them. Each fact should not include the person's name and should avoid redundant phrases like 'He/she' or 'The person'; instead, use direct statements like 'Likes surfing'. If there's only one fact, the array should contain exactly one item. Include all crucial details but do not add any additional facts beyond what is provided.";
    const fullPrompt = `${entry}`;

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
      setShowPreview(false);
      fetchContacts();
    } catch (error) {
      console.error('Error saving entries:', error);
    }
  };

  const handleTranscription = (transcription: string) => {
    setEntry(transcription);
  };

  return (
    <div className="w-full mb-6">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <textarea
            className="textarea textarea-bordered w-full h-32 mb-4"
            placeholder="Quickly add information about a person..."
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
          />
          <div className="card-actions justify-between">
            <MicrophoneButton onTranscription={handleTranscription} />
            <button
              className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
              onClick={handleQuickAdd}
              disabled={isLoading}
            >
              {isLoading ? '' : 'Process Entry'}
            </button>
          </div>
        </div>
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

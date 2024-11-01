import React, { useState } from 'react';
import axios from 'axios';

const QuickAdd: React.FC = () => {
  const [entry, setEntry] = useState<string>('');

  const handleQuickAdd = async () => {
    if (!entry.trim()) return;

    // Base prompt to provide context for the model
    const basePrompt = "Extract the names of people I interacted with and provide a list of facts about a specific person in an array.";

    try {
      // Concatenate the base prompt with the user entry
      const fullPrompt = `${basePrompt}\n\n${entry}`;

      // Send the concatenated prompt to the Google Gemini backend for processing
      const response = await axios.post('/api/contacts/generate', { prompt: fullPrompt });
      
      // Assuming the API returns the structured JSON content in 'structuredResponse' field
      console.log('Generated Content:', JSON.stringify(response.data.structuredResponse, null, 2)); // Pretty-print JSON
  
      setEntry('');
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

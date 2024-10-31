import React, { useState } from 'react';
import axios from 'axios';

const QuickAdd: React.FC = () => {
  const [entry, setEntry] = useState<string>('');

  const handleQuickAdd = async () => {
    if (!entry.trim()) return;
    try {
      // Send the quick add information to the LLM backend for processing
      await axios.post('/api/person', { content: entry });
      setEntry('');
    } catch (error) {
      console.error('Error adding quick entry:', error);
    }
  };

  return (
    <div className="container mx-auto p-8 flex flex-col items-center min-h-screen">
      <div className="w-full max-w-2xl">
        <div className="bg-base-100 rounded-xl shadow-lg p-6 mb-6 flex flex-col">
          <textarea
            className="textarea textarea-bordered w-full mb-4 resize-none"
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

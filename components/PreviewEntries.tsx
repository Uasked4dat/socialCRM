import React, { useState, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { DraggableCard } from './DraggableCard';

interface PreviewEntriesProps {
  structuredResponse: Array<{ name: string; content: string[] }>;
  existingContacts: Array<{ name: string; information: string }>;
  onClose: () => void;
  onConfirm: (updatedEntries: Array<{ name: string; information: string }>) => void;
}

const PreviewEntries: React.FC<PreviewEntriesProps> = ({ structuredResponse, existingContacts, onClose, onConfirm }) => {
  const [newEntries, setNewEntries] = useState(structuredResponse.filter(
    entry => !existingContacts.some(contact => contact.name.toLowerCase() === entry.name.toLowerCase())
  ));

  const [updateEntries, setUpdateEntries] = useState(structuredResponse.filter(
    entry => existingContacts.some(contact => contact.name.toLowerCase() === entry.name.toLowerCase())
  ));

  const newEntriesRef = useRef<HTMLDivElement>(null);
  const updateEntriesRef = useRef<HTMLDivElement>(null);

  // Drop target for "New Contacts" section
  const [, dropNew] = useDrop({
    accept: 'CARD',
    drop: (item: { name: string; content: string[] }) => {
      // Only add to newEntries if the item isn't already present
      if (!newEntries.some((entry) => entry.name === item.name)) {
        setNewEntries((prevNewEntries) => [...prevNewEntries, item]);
        setUpdateEntries((prevUpdateEntries) =>
          prevUpdateEntries.filter((entry) => entry.name !== item.name)
        );
      }
    },
  });

  // Drop target for "Update Existing Contacts" section
  const [, dropUpdate] = useDrop({
    accept: 'CARD',
    drop: (item: { name: string; content: string[] }) => {
      // Only add to updateEntries if the item isn't already present
      if (!updateEntries.some((entry) => entry.name === item.name)) {
        setUpdateEntries((prevUpdateEntries) => [...prevUpdateEntries, item]);
        setNewEntries((prevNewEntries) =>
          prevNewEntries.filter((entry) => entry.name !== item.name)
        );
      }
    },
  });

  // Attach drop functionality to refs
  dropNew(newEntriesRef);
  dropUpdate(updateEntriesRef);

  const handleConfirm = () => {
    const allEntries = [...newEntries, ...updateEntries];
    const formattedEntries = allEntries.map(entry => ({
      name: entry.name,
      information: entry.content.join(', ')
    }));
    onConfirm(formattedEntries);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-base-100 rounded-lg shadow-xl p-8 w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-6 text-neutral-content">Review and Confirm Entries</h2>

        {/* New Entries Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-primary mb-3">New Contacts</h3>
          <div ref={newEntriesRef} className="border border-base-300 rounded-lg p-4 bg-base-200 min-h-[100px]">
            {newEntries.length > 0 ? (
              newEntries.map((entry, index) => (
                <DraggableCard
                  key={`new-${index}`}
                  entry={entry}
                  onEditName={(newName) => setNewEntries(
                    newEntries.map((e, i) => i === index ? { ...e, name: newName } : e)
                  )}
                />
              ))
            ) : (
              <p className="text-sm text-gray-500">No new contacts to add.</p>
            )}
          </div>
        </div>

        {/* Update Existing Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-primary mb-3">Update Existing Contacts</h3>
          <div ref={updateEntriesRef} className="border border-base-300 rounded-lg p-4 bg-base-200 min-h-[100px]">
            {updateEntries.length > 0 ? (
              updateEntries.map((entry, index) => (
                <DraggableCard
                  key={`update-${index}`}
                  entry={entry}
                  isExisting
                  onChooseExistingContact={(existingName) => setUpdateEntries(
                    updateEntries.map((e, i) => i === index ? { ...e, name: existingName } : e)
                  )}
                />
              ))
            ) : (
              <p className="text-sm text-gray-500">No existing contacts to update.</p>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button className="btn btn-outline" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleConfirm}>Confirm and Save</button>
        </div>
      </div>
    </div>
  );
};

export default PreviewEntries;

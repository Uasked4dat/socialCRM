import React, { useState, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { DraggableCard } from './DraggableCard';

// Define the Entry interface
interface Entry {
  name: string;
  content: string[];
}

interface Contact {
  name: string;
}

interface PreviewEntriesProps {
  structuredResponse: Entry[];
  existingContacts: Contact[];
  onClose: () => void;
  onConfirm: (updatedEntries: Array<{ name: string; information: string }>) => void;
}

const PreviewEntries: React.FC<PreviewEntriesProps> = ({
  structuredResponse,
  existingContacts,
  onClose,
  onConfirm,
}) => {
  const [newEntries, setNewEntries] = useState<Entry[]>(
    structuredResponse.filter(
      (entry) =>
        !existingContacts.some(
          (contact) => contact.name.toLowerCase() === entry.name.toLowerCase()
        )
    )
  );

  const [updateEntries, setUpdateEntries] = useState<Entry[]>(
    structuredResponse.filter((entry) =>
      existingContacts.some(
        (contact) => contact.name.toLowerCase() === entry.name.toLowerCase()
      )
    )
  );

  const newEntriesRef = useRef<HTMLDivElement>(null);
  const updateEntriesRef = useRef<HTMLDivElement>(null);

  // Drop target for "New Contacts" section
  const [, dropNew] = useDrop({
    accept: 'CARD',
    drop: (item: Entry) => {
      // Remove from existing entries
      setUpdateEntries((prev) => prev.filter((entry) => entry !== item));
      // Add to new entries if not already present
      setNewEntries((prev) => {
        if (!prev.includes(item)) {
          return [...prev, item];
        }
        return prev;
      });
    },
  });

  // Drop target for "Existing Contacts" section
  const [, dropUpdate] = useDrop({
    accept: 'CARD',
    drop: (item: Entry) => {
      // Remove from new entries
      setNewEntries((prev) => prev.filter((entry) => entry !== item));
      // Add to existing entries if not already present
      setUpdateEntries((prev) => {
        if (!prev.includes(item)) {
          return [...prev, item];
        }
        return prev;
      });
    },
  });

  // Attach drop targets to refs
  dropNew(newEntriesRef);
  dropUpdate(updateEntriesRef);

  const handleConfirm = () => {
    const allEntries = [...newEntries, ...updateEntries];
    const formattedEntries = allEntries.map((entry) => ({
      name: entry.name,
      information: entry.content.join(', '),
    }));
    onConfirm(formattedEntries);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-base-100 rounded-lg shadow-xl p-8 w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-6 text-neutral-content">Review and Confirm Entries</h2>

        <div className="flex space-x-4">
          {/* New Entries Section */}
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-primary mb-3">New Contacts</h3>
            <div
              ref={newEntriesRef}
              className="border border-base-300 rounded-lg p-4 bg-base-200 min-h-[100px] max-h-48 overflow-y-auto"
            >
              {newEntries.length > 0 ? (
                newEntries.map((entry, index) => (
                  <DraggableCard
                    key={`${entry.name}-${index}`}
                    entry={entry}
                    isExisting={false}
                    onEditName={(newName) => {
                      setNewEntries((prev) =>
                        prev.map((e) => (e === entry ? { ...e, name: newName } : e))
                      );
                    }}
                  />
                ))
              ) : (
                <p className="text-sm text-gray-500">No new contacts to add.</p>
              )}
            </div>
          </div>

          {/* Update Existing Section */}
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-primary mb-3">Update Existing Contacts</h3>
            <div
              ref={updateEntriesRef}
              className="border border-base-300 rounded-lg p-4 bg-base-200 min-h-[100px] max-h-48 overflow-y-auto"
            >
              {updateEntries.length > 0 ? (
                updateEntries.map((entry, index) => (
                  <DraggableCard
                    key={`${entry.name}-${index}`}
                    entry={entry}
                    isExisting={true}
                    existingContacts={existingContacts}
                    onChooseExistingContact={(existingName) => {
                      setUpdateEntries((prev) =>
                        prev.map((e) => (e === entry ? { ...e, name: existingName } : e))
                      );
                    }}
                  />
                ))
              ) : (
                <p className="text-sm text-gray-500">No existing contacts to update.</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button className="btn btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleConfirm}>
            Confirm and Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewEntries;

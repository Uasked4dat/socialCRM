import React, { useRef, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import Select from 'react-select';

// Define the Entry interface
interface Entry {
  name: string;
  content: string[];
}

interface Contact {
  name: string;
}

interface DraggableCardProps {
  entry: Entry;
  isExisting?: boolean;
  existingContacts?: Contact[];
  onEditName?: (newName: string) => void;
  onChooseExistingContact?: (existingName: string) => void;
}

export const DraggableCard: React.FC<DraggableCardProps> = ({
  entry,
  isExisting,
  existingContacts = [],
  onEditName,
  onChooseExistingContact,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'CARD',
    item: entry, // Pass the entire entry object
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [entry]);

  drag(ref);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [entry]);

  const contactOptions = existingContacts.map(contact => ({
    value: contact.name,
    label: contact.name,
  }));

  // DaisyUI style customization for react-select
  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      backgroundColor: 'var(--tw-bg-base-100)',
      borderColor: 'var(--tw-border-base-300)',
      borderRadius: '0.375rem',
      padding: '0.25rem',
      fontSize: '0.875rem',
      boxShadow: 'none',
      '&:hover': { borderColor: 'var(--tw-border-base-300)' },
    }),
    input: (provided: any) => ({
      ...provided,
      color: 'var(--tw-text-base-content)',
      boxShadow: 'none', // Remove default shadow
      caretColor: 'var(--tw-text-primary)', // Adjust caret color
      '&:focus': {
        outline: 'none', // Remove blue outline
      },
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      color: 'var(--tw-text-primary)',
      '&:hover': { color: 'var(--tw-text-primary)' }, // Adjust hover color
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: '#1E293B',
      borderRadius: '0.375rem',
      borderColor: 'var(--tw-border-base-300)',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      opacity: '1',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? '#6366F1'
        : state.isFocused
        ? '#4F46E5'
        : '#1E293B',
      color: state.isSelected ? '#FFFFFF' : '#CBD5E1',
      padding: '0.5rem 1rem',
      '&:active': {
        backgroundColor: '#4F46E5',
      },
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: 'var(--tw-text-base-content)',
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: 'var(--tw-text-base-content)',
    }),
  };

  return (
    <div
      ref={ref}
      className={`p-4 bg-base-100 rounded-md shadow-sm mb-2 transition-opacity ${isDragging ? 'opacity-50' : 'opacity-100'}`}
    >
      <div className="font-bold mb-2">
        {isExisting ? (
          <Select
            options={contactOptions}
            defaultValue={{ value: entry.name, label: entry.name }}
            onChange={(selectedOption) => {
              onChooseExistingContact?.(selectedOption?.value || '');
            }}
            className="w-full"
            placeholder="Select an existing contact..."
            isSearchable
            styles={customStyles}
          />
        ) : (
          <input
            ref={inputRef}
            type="text"
            value={entry.name}
            onChange={(e) => {
              onEditName?.(e.target.value);
            }}
            className="input input-bordered w-full"
          />
        )}
      </div>
      <div className="text-gray-700">{entry.content.join(', ')}</div>
    </div>
  );
};

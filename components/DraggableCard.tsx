import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';

interface DraggableCardProps {
  entry: { name: string; content: string[] };
  isExisting?: boolean;
  onEditName?: (newName: string) => void;
  onChooseExistingContact?: (existingName: string) => void;
  onDropToUpdate?: () => void;
  onDropToNew?: () => void;
}

export const DraggableCard: React.FC<DraggableCardProps> = ({
  entry,
  isExisting,
  onEditName,
  onChooseExistingContact,
  onDropToUpdate,
  onDropToNew,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'CARD',
    item: { name: entry.name, content: entry.content },
    end: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        isExisting ? onDropToNew?.() : onDropToUpdate?.();
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  drag(ref); // Attach drag functionality to the ref

  return (
    <div
      ref={ref}
      className={`p-4 bg-base-100 rounded-md shadow-sm mb-2 transition-opacity ${isDragging ? 'opacity-50' : 'opacity-100'}`}
    >
      <div className="font-bold mb-2">
        {isExisting ? (
          <select onChange={(e) => onChooseExistingContact?.(e.target.value)} defaultValue={entry.name} className="select select-bordered w-full">
            {/* Insert dropdown options for existing contacts */}
          </select>
        ) : (
          <input
            type="text"
            value={entry.name}
            onChange={(e) => onEditName?.(e.target.value)}
            className="input input-bordered w-full"
          />
        )}
      </div>
      <div className="text-gray-700">{entry.content.join(', ')}</div>
    </div>
  );
};

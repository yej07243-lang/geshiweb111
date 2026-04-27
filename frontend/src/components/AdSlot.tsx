import React from 'react';

interface AdSlotProps {
  position: 'top' | 'middle' | 'result';
}

const AdSlot: React.FC<AdSlotProps> = ({ position }) => {
  return (
    <div className="w-full h-24 bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center my-4 rounded-lg">
      <p className="text-gray-400 text-sm font-medium">
        Advertisement Slot - {position.toUpperCase()}
      </p>
    </div>
  );
};

export default AdSlot;

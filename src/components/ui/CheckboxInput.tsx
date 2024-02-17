import { Check } from 'lucide-react';
import React, { useState } from 'react';

interface CheckboxProps {
  label: string;
  onCheck: (checked: boolean) => void;
}

const CustomCheckbox: React.FC<CheckboxProps> = ({ label, onCheck }) => {
  const [checked, setChecked] = useState<boolean>(false);

  const handleToggle = () => {
    const newCheckedState = !checked;
    setChecked(newCheckedState);
    onCheck(newCheckedState);
  };

  return (
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          className="hidden"
          checked={checked}
          onChange={handleToggle}
        />
        <div className="checkbox-toggle w-6 h-6 border border-gray-300 rounded-md bg-white transition-all duration-200 flex justify-center items-center">
          {checked && (
           <Check className='text-green-500' />
          )}
        </div>
      </div>
      <span className="ml-2 text-xs">{label}</span>
    </label>
  );
};

export default CustomCheckbox;

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface Chip {
  id: string;
  value: string;
}

interface ChipInputProps {
  onChipAdd: (chip: string) => void;
  className?: string;
  placeholder?: string;
}

const ChipInput: React.FC<ChipInputProps> = ({ onChipAdd, className, placeholder }) => {
  const [inputValue, setInputValue] = useState("");
  const [chips, setChips] = useState<Chip[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      const chip: Chip = { id: uuidv4(), value: inputValue.trim() };
      setChips([...chips, chip]);
      setInputValue("");
      onChipAdd(inputValue.trim());
    } else if (e.key === "Backspace" && inputValue === "") {
      // Remove the last chip when backspace is pressed and input is empty
      const lastChip = chips[chips.length - 1];
      if (lastChip) {
        handleChipRemove(lastChip.id);
      }
    }
  };

  const handleChipRemove = (chipId: string) => {
    const newChips = chips.filter((chip) => chip.id !== chipId);
    setChips(newChips);
  };

  return (
    <div className={cn(`flex flex-wrap gap-2 border border-gray-300 rounded p-2`,className)}>
      {chips.map((chip) => (
        <div
          key={chip.id}
          className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full flex items-center"
        >
          {chip.value}
          <button
            type="button"
            onClick={() => handleChipRemove(chip.id)}
            className="ml-2 focus:outline-none"
          >
            &#10005;
          </button>
        </div>
      ))}
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        className="outline-none border-none focus:ring-0 placeholder:text-xs"
        placeholder={placeholder || "Add More..."}
      />
    </div>
  );
};

export default ChipInput;

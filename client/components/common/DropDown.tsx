import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DropdownProps {
  label: string;
  options: string[];
  selectedValue: string | null;
  onSelect: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ label, options, selectedValue, onSelect }) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>

      {/* Wrap trigger/content in a relative container */}
      <div className="relative w-full">
        <DropdownMenu>
          <DropdownMenuTrigger
            className="w-full text-left border border-gray-300 p-2 rounded-md shadow-sm 
                       focus:ring-indigo-500 focus:border-indigo-500"
          >
            {selectedValue || "Select an option"}
          </DropdownMenuTrigger>

          {/* Use align="start"/side="bottom" for alignment, plus w-full */}
          <DropdownMenuContent
            align="start"
            side="bottom"
            sideOffset={0}
            className="w-full"
            style={{ width: "100%" }}
          >
            <DropdownMenuLabel>{label}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {options.map((option) => (
              <DropdownMenuItem
                key={option}
                onClick={() => onSelect(option)}
              >
                {option}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Dropdown;

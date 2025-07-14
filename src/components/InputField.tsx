import React from "react";

interface InputFieldProps {
  type?: string;
  field: string;
  label: string;
  icon: any;
  placeholder?: string;
  value: string;
  isFocused: boolean;
  hasValue: boolean;
  onChange: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
}

const InputField: React.FC<InputFieldProps> = ({
  type = "text",
  field,
  label,
  icon: Icon,
  placeholder = "",
  value,
  isFocused,
  hasValue,
  onChange,
  onFocus,
  onBlur,
}) => {
  return (
    <div className="relative">
      <div className="relative">
        <Icon
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 z-10"
          color="rgb(31, 41, 55)"
        />
        <input
          id={placeholder}
          type={type}
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={isFocused ? "" : placeholder}
          className={`
            w-full h-14 pl-12 pr-4 border-2 rounded-xl transition-all duration-300 !outline-none
            ${isFocused ? "shadow-lg shadow-purple-500/20" : ""}
            ${hasValue ? "bg-slate-50" : "bg-white"}
          `}
          style={{ color: "#1f2937" }}
        />
        <label
          className={`
          absolute left-12 transition-all duration-300 pointer-events-none
            ${
              isFocused || hasValue
                ? "-top-2 text-xs bg-blueAccent px-2 font-medium z-20"
                : "top-1/2 transform -translate-y-1/2"
            }
        `}
        >
          {isFocused && label}
        </label>
      </div>
    </div>
  );
};

export default InputField;

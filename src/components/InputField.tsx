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
  error?: string;
  maxLength?: number;
  pattern?: string;
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
  error,
  maxLength,
  pattern,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const isPasswordField = type === "password";
  // Eye and EyeBlocked SVG icons
  const EyeIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="black"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 12s3.75-7.5 9.75-7.5 9.75 7.5 9.75 7.5-3.75 7.5-9.75 7.5S2.25 12 2.25 12z"
      />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
  const EyeBlockedIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="black"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 3l18 18M9.88 9.88A3 3 0 0012 15a3 3 0 002.12-5.12M6.53 6.53C4.06 8.36 2.25 12 2.25 12s3.75 7.5 9.75 7.5c2.13 0 4.09-.5 5.72-1.36M17.47 17.47C19.94 15.64 21.75 12 21.75 12s-3.75-7.5-9.75-7.5c-2.13 0-4.09.5-5.72 1.36"
      />
    </svg>
  );
  return (
    <div className="relative">
      <div className="relative">
        <Icon
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 z-10"
          color="rgb(31, 41, 55)"
        />
        <input
          id={placeholder}
          type={isPasswordField && showPassword ? "text" : type}
          required
          value={value}
          onChange={(e) => {
            // Only allow digits for phone and pin fields
            let val = e.target.value;
            if (field === "phone") {
              val = val.replace(/[^0-9]/g, "");
              if (maxLength) val = val.slice(0, maxLength);
            }
            if (field === "spidrPin") {
              val = val.replace(/[^0-9]/g, "");
              if (maxLength) val = val.slice(0, maxLength);
            }
            onChange(val);
          }}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={isFocused ? "" : placeholder}
          className={`
            w-full h-14 pl-12 pr-12 border-2 rounded-xl transition-all duration-300 !outline-none 
            ${isFocused ? "shadow-lg shadow-purple-500/20" : ""}
            ${hasValue ? "bg-slate-50" : "bg-white"}
            ${error ? "border-red-500" : ""}
          `}
          style={{ color: "#1f2937" }}
          maxLength={maxLength}
          pattern={pattern}
        />
        {/* Password visibility toggle */}
        {isPasswordField && (
          <button
            type="button"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 focus:outline-none"
            onClick={() => setShowPassword((prev) => !prev)}
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? EyeBlockedIcon : EyeIcon}
          </button>
        )}
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
        {error && (
          <span className="absolute left-12 -bottom-6 text-xs text-red-500 font-medium">
            {error}
          </span>
        )}
      </div>
    </div>
  );
};

export default InputField;

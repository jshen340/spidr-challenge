import React, { useState } from "react";
import { Mail, Phone, User, DollarSign, Key } from "lucide-react";
import InputField from "./components/InputField";
import SpidrLogoNoText from "./assets/spidr_logo_no_text.png";
interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  costGuess: string;
  spidrPin: string;
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    costGuess: "",
    spidrPin: "",
  });

  const [focusedField, setFocusedField] = useState<string>("");
  const [errors, setErrors] = useState<{ phone?: string; spidrPin?: string }>(
    {}
  );

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  };

  const formatCurrency = (value: string) => {
    // Allow only digits and a single decimal point
    let sanitized = value.replace(/[^\d.]/g, "");
    // Prevent multiple decimals
    const parts = sanitized.split(".");
    if (parts.length > 2) {
      sanitized = parts[0] + "." + parts.slice(1).join("");
    }
    // Format integer part with commas, keep decimals (max 2 digits)
    const [integer, decimal] = sanitized.split(".");
    const formattedInt = integer ? parseInt(integer, 10).toLocaleString() : "";
    if (decimal !== undefined) {
      const trimmedDecimal = decimal.slice(0, 2);
      return `${formattedInt}.${trimmedDecimal}`;
    }
    return formattedInt;
  };

  const formatPin = (value: string) => {
    const digits = value.replace(/\D/g, "");
    const groups: string[] = [];
    for (let i = 0; i < digits.length; i += 4) {
      groups.push(digits.slice(i, i + 4));
    }
    return groups.join("-").slice(0, 19); // Limit to 16 digits + 3 dashes
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    let formattedValue = value;

    if (field === "phone") {
      formattedValue = formatPhone(value);
    } else if (field === "costGuess") {
      formattedValue = formatCurrency(value);
    } else if (field === "spidrPin") {
      formattedValue = formatPin(value);
    }

    setFormData((prev) => ({
      ...prev,
      [field]: formattedValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Remove dashes for digit count
    const phoneDigits = formData.phone.replace(/[^0-9]/g, "");
    const pinDigits = formData.spidrPin.replace(/[^0-9]/g, "");
    const newErrors: { phone?: string; spidrPin?: string } = {};
    if (phoneDigits.length !== 10) {
      newErrors.phone = "Phone number must be exactly 10 digits.";
    }
    if (pinDigits.length !== 16) {
      newErrors.spidrPin = "Spidr PIN must be exactly 16 digits.";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    console.log("Form Data Submitted:", formData);
    alert("Interest submitted! Check the console for your data.");
    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      costGuess: "",
      spidrPin: "",
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-bgGray from-slate-50 via-white to-indigo-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16">
            <img src={SpidrLogoNoText} />
          </div>
          <h1 className="text-4xl font-[Raleway] text-textGray font-bold text-slate-800 mb-4">
            Revolutionary Air Fryer
          </h1>
          <p className="text-lg text-slate-600 font-[Raleway] leading-relaxed text-textGray">
            Be among the first to experience the future of cooking. Submit your
            interest below and get exclusive early access.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="!bg-blueAccent rounded-3xl shadow-2xl p-8 space-y-6 font-[Raleway] text-white "
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              field="firstName"
              label="First Name"
              icon={User}
              placeholder="Enter your first name"
              value={formData.firstName}
              isFocused={focusedField === "firstName"}
              hasValue={formData.firstName.length > 0}
              onChange={(value) => handleInputChange("firstName", value)}
              onFocus={() => setFocusedField("firstName")}
              onBlur={() => setFocusedField("")}
            />
            <InputField
              field="lastName"
              label="Last Name"
              icon={User}
              placeholder="Enter your last name"
              value={formData.lastName}
              isFocused={focusedField === "lastName"}
              hasValue={formData.lastName.length > 0}
              onChange={(value) => handleInputChange("lastName", value)}
              onFocus={() => setFocusedField("lastName")}
              onBlur={() => setFocusedField("")}
            />
          </div>

          <InputField
            type="email"
            field="email"
            label="Email Address"
            icon={Mail}
            placeholder="your.email@example.com"
            value={formData.email}
            isFocused={focusedField === "email"}
            hasValue={formData.email.length > 0}
            onChange={(value) => handleInputChange("email", value)}
            onFocus={() => setFocusedField("email")}
            onBlur={() => setFocusedField("")}
          />

          <InputField
            type="tel"
            field="phone"
            label="Phone Number"
            icon={Phone}
            placeholder="123-456-7890"
            value={formData.phone}
            isFocused={focusedField === "phone"}
            hasValue={formData.phone.length > 0}
            onChange={(value) => handleInputChange("phone", value)}
            onFocus={() => setFocusedField("phone")}
            onBlur={() => setFocusedField("")}
            error={errors.phone}
            maxLength={12}
          />

          <div className="relative">
            <InputField
              type="text"
              field="costGuess"
              label="Guess the Price"
              icon={DollarSign}
              placeholder="299.99"
              value={formData.costGuess}
              isFocused={focusedField === "costGuess"}
              hasValue={formData.costGuess.length > 0}
              onChange={(value) => handleInputChange("costGuess", value)}
              onFocus={() => setFocusedField("costGuess")}
              onBlur={() => setFocusedField("")}
            />
          </div>

          <InputField
            type="password"
            field="spidrPin"
            label="Secret 16-Digit Spidr PIN"
            icon={Key}
            placeholder="####-####-####-####"
            value={formData.spidrPin}
            isFocused={focusedField === "spidrPin"}
            hasValue={formData.spidrPin.length > 0}
            onChange={(value) => handleInputChange("spidrPin", value)}
            onFocus={() => setFocusedField("spidrPin")}
            onBlur={() => setFocusedField("")}
            error={errors.spidrPin}
            maxLength={19}
          />

          <button
            type="submit"
            className="w-full h-14 font-semibold text-white outline outline-2 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl shadow-lg mt-8"
            style={{ color: "white" }}
          >
            Submit Interest
          </button>

          <p
            className="text-center text-white text-sm mt-4"
            style={{ color: "white" }}
          >
            By submitting, you agree to receive updates about our revolutionary
            air fryer.
          </p>
        </form>
      </div>
    </div>
  );
}

export default App;

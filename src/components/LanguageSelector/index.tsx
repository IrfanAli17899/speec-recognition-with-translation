import React from "react";

interface LanguageSelectorProps {
    label:string
    languages: [string, string][];
    selectedLanguage: string;
    onLanguageChange: (value: string) => void;
}

const LanguageSelector = ({ languages, selectedLanguage, label, onLanguageChange }: LanguageSelectorProps) => {
  return (
    <label className="flex gap-2">
      <span>{label}</span>
      <select
        name={`${selectedLanguage}-lang`}
        value={selectedLanguage}
        className="outline-none"
        onChange={(ev) => onLanguageChange(ev.target.value)}
      >
        {languages.map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </select>
    </label>
  );
};

export default LanguageSelector;
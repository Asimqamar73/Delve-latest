import React from "react";

function CourseLanguageFilterComponent({ handleChange, selected, id }) {
  const languages = ["English", "Urdu", "Hindi", "Spanish", "German", "French"];

  return (
    <div>
      <p className="font-bold text-2xl">Course language</p>
      {languages.map((language) => (
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="checkbox checkbox-sm rounded-md"
            checked={selected.includes(language)}
            value={language}
            id={id}
            onChange={handleChange}
          />
          <label>{language}</label>
        </div>
      ))}
    </div>
  );
}

export default CourseLanguageFilterComponent;

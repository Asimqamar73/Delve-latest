import React from "react";

function CourseLevelFilterComponent({ id, handleChange, selected }) {
  const courseLevel = ["All Levels", "Beginner", "Intermediate", "Expert"];

  return (
    <div>
      <p className="font-bold text-2xl">Course level</p>
      {courseLevel.map((level) => (
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="checkbox checkbox-sm rounded-md"
            checked={selected.includes(level)}
            value={level}
            id={id}
            onChange={handleChange}
          />
          <label>{level}</label>
        </div>
      ))}
    </div>
  );
}

export default CourseLevelFilterComponent;

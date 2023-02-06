import React, { useState } from "react";

function RatingStars({handleChange}) {
//   const [rating, setRating] = useState(1);

//   const onMutate = (event) => {
//     console.log(event.target.value);
//     setRating(event.target.value);
//   };
  return (
    <div className="rating rating-lg rating-half">
      <input type="radio" name="course-rating" className="rating-hidden" />
      <input
        type="radio"
        name="course-rating"
        id="rating"
        value={0.5}
        className="mask mask-star-2 mask-half-1"
        onChange={handleChange}
      />
      <input
        type="radio"
        name="course-rating"
        id="rating"
        value={1}
        className="mask mask-star-2 mask-half-2"
        onChange={handleChange}
      />
      <input
        type="radio"
        name="course-rating"
        id="rating"
        value={1.5}
        className="mask mask-star-2 mask-half-1"
        onChange={handleChange}
      />
      <input
        type="radio"
        name="course-rating"
        id="rating"
        value={2}
        className="mask mask-star-2 mask-half-2"
        onChange={handleChange}
      />
      <input
        type="radio"
        name="course-rating"
        id="rating"
        value={2.5}
        className="mask mask-star-2 mask-half-1"
        onChange={handleChange}
      />
      <input
        type="radio"
        name="course-rating"
        id="rating"
        value={3}
        className="mask mask-star-2 mask-half-2"
        onChange={handleChange}
      />
      <input
        type="radio"
        name="course-rating"
        id="rating"
        value={3.5}
        className="mask mask-star-2 mask-half-1"
        onChange={handleChange}
      />
      <input
        type="radio"
        name="course-rating"
        id="rating"
        value={4}
        className="mask mask-star-2 mask-half-2"
        onChange={handleChange}
      />
      <input
        type="radio"
        name="course-rating"
        id="rating"
        value={4.5}
        className="mask mask-star-2 mask-half-1"
        onChange={handleChange}
      />
      <input
        type="radio"
        name="course-rating"
        id="rating"
        value={5}
        className="mask mask-star-2 mask-half-2"
        onChange={handleChange}
      />
    </div>
  );
}

export default RatingStars;

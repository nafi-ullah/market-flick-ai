// components/StarRating.tsx
import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

interface StarRatingProps {
  value: number; // Rating value between 0 to 5
}

const StarRating: React.FC<StarRatingProps> = ({ value }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className="text-yellow-500">
          {value >= star ? <FaStar /> : <FaRegStar />}
        </span>
      ))}
    </div>
  );
};

export default StarRating;

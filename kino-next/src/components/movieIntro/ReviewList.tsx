import { FC } from "react";

import Review from "./Review";

const ReviewList: FC = () => {
  return (
    <ul className="movieReviewList">
      <Review />
      <Review />
      <Review />
      <Review />
      <Review />
    </ul>
  );
}

export default ReviewList;
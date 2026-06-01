import { FC } from "react";

import Review from "./Review";

import type { review } from "@/types";

type Props = {
  reviews: review[];
}

const ReviewList: FC<Props> = ({ reviews }) => {
  return (
    <ul className="movieReviewList">
      {reviews.map((review) => {
        return (
          <Review review={review} key={review.id} />
        );
      })}
    </ul>
  );
}

export default ReviewList;
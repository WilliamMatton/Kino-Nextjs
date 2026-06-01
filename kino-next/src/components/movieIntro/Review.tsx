import { FC } from "react";

import type { review } from "@/types";

type Props = {
  review: review;
}

const Review: FC<Props> = ({ review }) => {
  return (
    <li className="movieReviewListItem">
      <small className="movieReviewRating">{`${review.attributes.rating} av 5`}</small>
      <div className="movieReview">
        <p className="movieReviewComment">{review.attributes.comment}</p>
        <small className="movieReviewAuthor">{review.attributes.author}</small>
      </div>
    </li>
  );
}

export default Review;
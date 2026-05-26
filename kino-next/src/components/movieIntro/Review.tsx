import { FC } from "react";

const Review: FC = () => {
  return (
    <li className="movieReviewListItem">
      <small className="movieReviewRating">3 av 5</small>
      <div className="movieReview">
        <p className="movieReviewComment">This is a review</p>
        <small className="movieReviewAuthor">Author</small>
      </div>
    </li>
  );
}

export default Review;
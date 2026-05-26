import { FC } from "react";

import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import ReviewPagination from "./ReviewPagination";

const ReviewContainer: FC = () => {
  return (
    <section className="movieReviews">
      <h1 className="movieReviewsHeading">Recensioner</h1>
      <ReviewForm />
      <ReviewList />
      <ReviewPagination />
    </section>
  );
}

export default ReviewContainer;
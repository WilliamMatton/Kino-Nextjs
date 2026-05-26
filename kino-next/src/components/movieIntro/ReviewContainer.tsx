import { FC } from "react";

import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import ReviewPagination from "./ReviewPagination";

type Props = {
  movieID: number;
  page: number;
}

const ReviewContainer: FC<Props> = async ({ movieID, page }) => {
  const res = await fetch(`http://localhost:3000/api/reviews/${movieID}?page=${page}`);
  const reviews = await res.json();
  const totalPages = reviews.meta.pagination.pageCount;

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
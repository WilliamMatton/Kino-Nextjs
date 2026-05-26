'use client'

import { FC } from "react"

const ReviewPagination: FC = () => {
  function nextPage() {
    console.log('Next page');
  }

  function previousPage() {
    console.log('Previous page');
  }

 return (
  <div className="movieReviewButtons">
    <button className="previousReviewPageBtn" onClick={previousPage}>Föregående sida</button>
    <button className="nextReviewPageBtn" onClick={nextPage}>Nästa sida</button>
  </div>
 );
}

export default ReviewPagination;
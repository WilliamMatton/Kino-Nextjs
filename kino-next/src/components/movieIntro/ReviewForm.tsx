'use client'

import { FC } from "react"

const ReviewForm: FC = () => {
  return (
    <form className="movieReviewForm movieReviewListItem">
      <label htmlFor="reviewFormName">Namn</label>
      <input type="text" name="reviewName" id="reviewFormName" className="reviewName" required />
      <label htmlFor="reviewFormRating">Betyg (1-5)</label>
      <input type="number" name="reviewRating" id="reviewFormRating" className="reviewRatingInput" min={1} max={5} required />
      <label htmlFor="reviewFormComment">Kommentar</label>
      <textarea name="reviewComment" id="reviewFormComment" className="reviewCommentInput" rows={4} required />
      <button type="submit" className="reviewSubmitBtn">Skicka recension</button>
      <p className="reviewStatus" aria-live="polite"></p>
    </form>
  );
}

export default ReviewForm;
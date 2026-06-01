'use client';

import { FC, useState } from "react";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

type Props = {
  movieID: number;
}

async function submitReview(author: string, rating: number, comment: string, movieID: number) {
  try {
    const response = await fetch('http://localhost:3000/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          author: author,
          rating: rating,
          comment: comment,
          movie: movieID
        }
      }),
    });

    if(!response.ok) {
      return { success: false, error: 'Failed to create review, try again later.' };
    }
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Server Error: Failed to Create Review.' };
  }
}

const ReviewForm: FC<Props> = ({ movieID }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [authorText, setAuthorText] = useState('');
  const [ratingText, setRatingText] = useState('');
  const [commentText, setCommentText] = useState('');

  const [errorMsg, setErrorMsg] = useState('');

  return (
    <form className="movieReviewForm movieReviewListItem" onSubmit={async (ev) => {
      ev.preventDefault();
      setErrorMsg('');

      const params = new URLSearchParams(searchParams);
      const result = await submitReview(authorText, Number(ratingText), commentText, movieID);
      
      if(!result.success) {
        setErrorMsg(result.error!);
        return;
      }

      setAuthorText('');
      setRatingText('');
      setCommentText('');
      
      replace(`${pathname}?${params.toString()}`, { scroll: false });
    }}>
      <label htmlFor="reviewFormName">Namn</label>
      <input
        type="text"
        id="reviewFormName"
        className="reviewName"
        required
        value={authorText}
        onChange={
          (event) => setAuthorText(event.target.value)
        }
      />
      <label htmlFor="reviewFormRating">Betyg (1-5)</label>
      <input
        type="number"
        id="reviewFormRating"
        className="reviewRatingInput"
        min={1}
        max={5}
        required
        value={ratingText}
        onChange={
          (event) => setRatingText(event.target.value)
        }
      />
      <label htmlFor="reviewFormComment">Kommentar</label>
      <textarea
        id="reviewFormComment"
        className="reviewCommentInput"
        rows={4}
        required
        value={commentText}
        onChange={
          (event) => setCommentText(event.target.value)
        }
      />
      <button type="submit" className="reviewSubmitBtn">Skicka recension</button>
      {errorMsg.length > 0 &&
        <p className="reviewStatus" aria-live="polite">{errorMsg}</p>
      }
      </form>
  );
}

export default ReviewForm;
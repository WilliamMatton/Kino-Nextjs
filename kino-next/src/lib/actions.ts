"use server"

import { revalidatePath } from "next/cache"

export async function createReview(movieID: number, formData: FormData) {
  const rawFormData = {
    author: formData.get('reviewName'),
    rating: formData.get('reviewRating'),
    comment: formData.get('reviewComment'),
  };

  try {
    await fetch('http://localhost:3000/api/reviews'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          author: rawFormData.author,
          rating: rawFormData.rating,
          comment: rawFormData.comment,
          movie: movieID
        }
      }),
    }
  } catch(error) {
    console.error(error);
    return {
      message: 'Server Error: Failed to Create Review.'
    };
  }

  revalidatePath(`/movie/${movieID}`);
}
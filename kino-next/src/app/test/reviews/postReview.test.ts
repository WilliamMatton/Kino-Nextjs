import { describe, expect, it, beforeEach, jest } from '@jest/globals';
import cmsAdapter from '@/cmsAdapter';

describe('postReviews()', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Tests successfully posting a review', async () => {
    const mockResponse = {
      status: 201,
      json: async () => ({
        data: {
          id: 1,
          attributes: {
            author: "Reviewer",
            rating: 5,
            comment: "Great movie!",
            movie: 8,
          }
        }
      })
    };

    globalThis.fetch = jest.fn(async (url, options) =>
      mockResponse as any
    );

    const reviewData = {
      data: {
        author: "Reviewer",
        rating: 5,
        comment: "Great movie!",
        movie: 8
      }
    };
    
    const result = await cmsAdapter.postReview(reviewData);

    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/reviews'),
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json'
        })
      })
    );

    expect(result.data.attributes.author).toBe("Reviewer");
    expect(result.data.attributes.rating).toBe(5);
  });
});
import { describe, expect, it } from '@jest/globals';
import { getReviewRating } from "../api/reviews/route";

describe('getReviewRating()', () => {

  it('returns average rating when reviews exist', async () => {

    globalThis.fetch = async () =>
      ({
        json: async () => ({
          data: [
            { attributes: { rating: 4 } },
            { attributes: { rating: 6 } },
            { attributes: { rating: 2 } },
            { attributes: { rating: 2 } },
            { attributes: { rating: 2 } },
          ],
        }),
      } as any);

    const result = await getReviewRating("1", 1);

    expect(result).toBe(3.2);
  });

  it('returns null if there are no reviews', async () => {

    globalThis.fetch = async () =>
      ({
        json: async () => ({
          data: [],
        }),
      } as any);

    const result = await getReviewRating("1", 1);

    expect(result).toBeNull();
  });

  it('returns null if there are less than 5 reviews', async () => {

    globalThis.fetch = async () =>
      ({
        json: async () => ({
          data: [
            { attributes: { rating: 4 } },
            { attributes: { rating: 6 } },
            { attributes: { rating: 2 } },
            { attributes: { rating: 3 } },
          ],
        }),
      } as any);

    const result = await getReviewRating("1", 1);

    expect(result).toBeNull();
  });

});
import { describe, expect, it, jest } from '@jest/globals';
import cmsAdapter from '@/cmsAdapter';

describe('fetchRating()', () => {
  it('returns average rating when reviews exist', async () => {
    globalThis.fetch = jest.fn(async () => ({
      ok: true,
      json: async () => ({
        data: [
          { attributes: { rating: 4 } },
          { attributes: { rating: 6 } },
          { attributes: { rating: 2 } },
          { attributes: { rating: 2 } },
          { attributes: { rating: 2 } },
        ],
      }),
    })) as any;

    const result = await cmsAdapter.fetchRating('1');
    const fetchUrl = (globalThis.fetch as jest.Mock).mock.calls[0][0] as string;

    expect(fetchUrl).toContain('/reviews?');
    expect(fetchUrl).toContain('filters%5Bmovie%5D=1');
    expect(result).toBe(3.2);
  });

  it('returns null if there are no reviews', async () => {
    globalThis.fetch = jest.fn(async () => ({
      ok: true,
      json: async () => ({
        data: [],
      }),
    })) as any;

    const result = await cmsAdapter.fetchRating('1');

    expect(result).toBeNull();
  });
});

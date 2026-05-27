import { afterEach, describe, expect, it, jest } from '@jest/globals';
import cmsAdapter from '@/cmsAdapter';

describe('fetchRating()', () => {
  afterEach(() => {
    jest.clearAllMocks();
    delete process.env.OMDB_API_KEY;
  });

  it('returns average rating from reviews when there are at least five reviews', async () => {
    process.env.OMDB_API_KEY = 'test-key';
    globalThis.fetch = jest.fn(async () => ({
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
    expect(fetchUrl).toContain('filters[movie]=1');
    expect(result).toBe(3.2);
    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining('filters[movie]=1')
    );
  });

  it('returns IMDb rating when there are fewer than five reviews', async () => {
    process.env.OMDB_API_KEY = 'test-key';
    let callCount = 0;
    globalThis.fetch = jest.fn(async () => {
      callCount += 1;

      if (callCount === 1) {
        return {
          json: async () => ({
            data: [
              { attributes: { rating: 4 } },
              { attributes: { rating: 6 } },
            ],
          }),
        };
      }

      if (callCount === 2) {
        return {
          json: async () => ({
            data: {
              attributes: {
                imdbId: 'tt0110912',
              },
            },
          }),
        };
      }

      return {
        json: async () => ({
          imdbRating: '8.9',
        }),
      };
    }) as any;

    const result = await cmsAdapter.fetchRating('1');

    expect(result).toBe(8.9);
    expect(globalThis.fetch).toHaveBeenCalledTimes(3);
    expect(globalThis.fetch).toHaveBeenLastCalledWith(
      'https://www.omdbapi.com/?i=tt0110912&apikey=test-key'
    );
  });

  it('returns null when IMDb does not have a rating', async () => {
    process.env.OMDB_API_KEY = 'test-key';
    let callCount = 0;
    globalThis.fetch = jest.fn(async () => {
      callCount += 1;

      if (callCount === 1) {
        return {
          json: async () => ({
            data: [],
          }),
        };
      }

      if (callCount === 2) {
        return {
          json: async () => ({
            data: {
              attributes: {
                imdbId: 'tt0110912',
              },
            },
          }),
        };
      }

      return {
        json: async () => ({
          imdbRating: 'N/A',
        }),
      };
    }) as any;

    const result = await cmsAdapter.fetchRating('1');

    expect(result).toBeNull();
  });
});

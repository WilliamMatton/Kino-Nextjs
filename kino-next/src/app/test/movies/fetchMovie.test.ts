import { describe, expect, it, beforeEach, jest } from '@jest/globals';
import cmsAdapter from '@/cmsAdapter';

describe('fetchMovie(movieID)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Tests movie fetching with correct movie ID', async () => {
    globalThis.fetch = jest.fn(async () =>
      ({
        json: async () => ({
          data: {
            id: 8,
            attributes: {
              title: "Pulp Fiction",
              imdbId: "id",
              intro: "This is a movie intro.",
              image: {
                url: "imageurl"
              },
              createdAt: Date.now().toString(),
              updatedAt: Date.now().toString(),
              publishedAt: Date.now().toString()
            }
          }
        })
      } as any)
    );
    
    const result = await cmsAdapter.fetchMovie(8);
    
    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/movies/8')
    );
    expect(result.attributes.title).toBe('Pulp Fiction');
  });
});
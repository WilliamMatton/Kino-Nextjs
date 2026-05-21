import { describe, expect, it, beforeEach, jest } from '@jest/globals';
import cmsAdapter from '@/cmsAdapter';

describe('getReviews()', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Tests review fetching with correct movie ID', async () => {
    globalThis.fetch = jest.fn(async (url) =>
      ({
        json: async () => ({
          data: [
            {
              id: 1,
              attributes: {
                createdAt: Date.now().toString(),
                comment: "A Pulp Fiction review",
                rating: 4,
                author: "Review Author",
                verified: null,
                updatedAt: Date.now().toString(),
              }
            },
          ],
        }),
      } as any)
    );
    
    const result = await cmsAdapter.getReviews(8, 1);
    
    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining('filters[movie]=8')
    );
    expect(result.data[0].attributes.comment).toBe('A Pulp Fiction review');
  });
  
  it('Tests pagination page number and page size are passed correctly', async () => {
    globalThis.fetch = jest.fn(async (url) => 
      ({
        json: async () => ({
          data: [],
        }),
      } as any)
    );

    await cmsAdapter.getReviews(8, 2);

    expect(globalThis.fetch).toHaveBeenLastCalledWith(
      expect.stringContaining('pagination[page]=2')
    );
    expect(globalThis.fetch).toHaveBeenLastCalledWith(
      expect.stringContaining('pagination[pageSize]=5')
    );
  });

  it('Tests different page numbers produce different fetch calls', async () => {
    globalThis.fetch = jest.fn(async (url) => 
      ({
        json: async () => ({
          data: [],
        }),
      } as any)
    );

    await cmsAdapter.getReviews(8, 1);
    const firstCall = (globalThis.fetch as jest.Mock).mock.calls[0][0];

    await cmsAdapter.getReviews(8, 3);
    const secondCall = (globalThis.fetch as jest.Mock).mock.calls[1][0];

    expect(firstCall).toContain('pagination[page]=1');
    expect(secondCall).toContain('pagination[page]=3');
  });
});
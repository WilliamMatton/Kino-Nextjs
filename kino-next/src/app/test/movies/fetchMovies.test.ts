/* unit test för movies */

import { describe, expect, it, beforeEach, jest } from '@jest/globals';
import cmsAdapter from '@/cmsAdapter';

describe('fetchMovies()', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Tests fetching all movies', async () => {
    globalThis.fetch = jest.fn(async () =>
      ({
        ok: true,
        json: async () => ({
          data: [
            {
              id: 1,
              attributes: {
                title: 'Pulp Fiction'
              }
            },
            {
              id: 2,
              attributes: {
                title: 'Fight Club'
              }
            }
          ]
        })
      } as any)
    );

    const result = await cmsAdapter.fetchMovies();

    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/movies')
    );

    expect(result).toHaveLength(2);

    expect(result[0].attributes.title).toBe('Pulp Fiction');
    expect(result[1].attributes.title).toBe('Fight Club');
  });
});






import { describe, expect, it, jest } from '@jest/globals';
import cmsAdapter from '@/cmsAdapter';

describe('fetchFirstFiveScreenings', () => {
  it('fetches the first five upcoming screenings for a movie', async () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-05-11T12:00:00Z'));

    globalThis.fetch = jest.fn(async () => ({
      ok: true,
      json: async () => ({
        data: [
          { attributes: { start_time: '2026-05-11T17:00:00.000Z' } },
          { attributes: { start_time: '2026-05-11T21:00:00.000Z' } },
          { attributes: { start_time: '2026-05-12T12:00:00.000Z' } },
          { attributes: { start_time: '2026-05-12T21:00:00.000Z' } },
          { attributes: { start_time: '2026-05-13T12:00:00.000Z' } },
        ],
      }),
    })) as any;

    const result = await cmsAdapter.fetchFirstFiveScreenings('8');
    const fetchUrl = (globalThis.fetch as jest.Mock).mock.calls[0][0] as string;

    expect(fetchUrl).toContain('/screenings?');
    expect(fetchUrl).toContain('filters%5Bmovie%5D=8');
    expect(fetchUrl).toContain('pagination%5BpageSize%5D=5');
    expect(fetchUrl).toContain('sort=start_time%3Aasc');
    expect(result).toHaveLength(5);

    jest.useRealTimers();
  });
});

/// <reference types="jest" />
import { jest } from '@jest/globals';
import { GET } from './route';
import { NextResponse } from 'next/server';

// Mocka global fetch
global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;

describe('GET /api/screenings (Nästa 5 dagar)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Fixera dagens datum i testerna för stabila tidsberäkningar
    jest.useFakeTimers().setSystemTime(new Date('2026-05-29T12:00:00.000Z'));
  });


  afterEach(() => {
    jest.useRealTimers();
  });

  it('ska hämta och filtrera visningar korrekt för de närmsta 5 dagarna', async () => {
    const mockScreenings = {
      data: [
        {
          id: 1,
          attributes: { start_time: '2026-05-29T19:00:00.000Z', movie: { data: {} } } // Idag (Ska inkluderas)
        },
        {
          id: 2,
          attributes: { start_time: '2026-06-02T19:00:00.000Z', movie: { data: {} } } // Om 4 dagar (Ska inkluderas)
        },
        {
          id: 3,
          attributes: { start_time: '2026-06-03T12:00:00.000Z', movie: { data: {} } } // Om 6 dagar (Ska filtreras bort)
        }
      ]
    };

    (global.fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
   ({ ok: true, status: 200, json: async () => mockScreenings } as unknown) as Response
);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveLength(3); // Endast id 1 och 2 ska vara kvar
    expect(data[0].id).toBe(1);
    expect(data[1].id).toBe(2);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('ska returnera felkod om det externa API-anropet misslyckas', async () => {
    (global.fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({ error: 'Misslyckades att hämta data' }),
    } as Response);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(404);
    expect(data).toEqual({ error: 'Misslyckades att hämta data' });
  });

  it('ska hantera krascher och returnera statuskod 500 vid internt serverfel', async () => {
    (global.fetch as jest.MockedFunction<typeof fetch>).mockRejectedValueOnce(new Error('Network error'));

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data).toEqual({ error: 'Internt serverfel' });
  });
});
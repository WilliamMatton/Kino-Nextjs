import { NextResponse } from 'next/server';

const MOVIE_API = 'https://plankton-app-xhkom.ondigitalocean.app/api';

export async function GET() {
  try {
    const now = new Date().toISOString();
    const url = `${MOVIE_API}/screenings?populate=movie&filters[start_time][$gte]=${encodeURIComponent(now)}&sort=start_time:asc`;

    const res = await fetch(url, { next: { revalidate: 3600 } }); // Cachas i 1 timme
    
    if (!res.ok) {
      return NextResponse.json({ error: 'Misslyckades att hämta data' }, { status: res.status });
    }

    const json = await res.json();

    const today = new Date();
    const fiveDaysFromNow = new Date();
    fiveDaysFromNow.setDate(today.getDate() + 5);

    // Filtrera visningar: Nu till 5 dagar framåt
    const filtered = (json.data || []).filter((s: any) => {
      const screeningDate = new Date(s.attributes.start_time);
      return screeningDate >= today && screeningDate <= fiveDaysFromNow;
    });

    return NextResponse.json(filtered);
  } catch (error) {
    return NextResponse.json({ error: 'Internt serverfel' }, { status: 500 });
  }
}

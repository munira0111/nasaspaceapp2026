import { DEMO_REGIONS } from '../data/demoRegions';

export interface SearchResult {
  name: string;
  country: string;
  lat: number;
  lng: number;
  zoom: number;
  regionId?: string;
  eventId?: string;
}

const PREDEFINED_LOCATIONS: SearchResult[] = [
  { name: 'Sylhet', country: 'Bangladesh', lat: 24.8949, lng: 91.8687, zoom: 11, regionId: 'south-asia-bd-sylhet', eventId: 'bd-sylhet-2026' },
  { name: 'Sunamganj', country: 'Bangladesh', lat: 25.0000, lng: 91.4000, zoom: 11, regionId: 'south-asia-bd-sylhet', eventId: 'bd-sylhet-2026' },
  { name: 'Kurigram', country: 'Bangladesh', lat: 25.8072, lng: 89.6295, zoom: 11, regionId: 'south-asia-bd-kurigram', eventId: 'bd-kurigram-2026' },
  { name: 'Dhaka', country: 'Bangladesh', lat: 23.8103, lng: 90.4125, zoom: 11, regionId: 'south-asia-bd-dhaka', eventId: 'bd-dhaka-2026' },
  { name: 'Bangladesh', country: 'Bangladesh', lat: 23.6850, lng: 90.3563, zoom: 7, regionId: 'south-asia-bd-sylhet', eventId: 'bd-sylhet-2026' },
  { name: 'Assam / Guwahati', country: 'India', lat: 26.1445, lng: 91.7362, zoom: 10, regionId: 'south-asia-in-assam', eventId: 'in-assam-2026' },
  { name: 'Koshi / Terai', country: 'Nepal', lat: 26.6528, lng: 87.1627, zoom: 10, regionId: 'south-asia-np-terai', eventId: 'np-terai-2026' },
  { name: 'Valencia', country: 'Spain', lat: 39.4699, lng: -0.3763, zoom: 11, regionId: 'europe-es-valencia', eventId: 'es-valencia-2026' },
  { name: 'Mekong Delta', country: 'Vietnam', lat: 10.0452, lng: 105.7469, zoom: 9, regionId: 'se-asia-vn-mekong', eventId: 'vn-mekong-2026' },
  { name: 'Mississippi River', country: 'United States', lat: 32.3547, lng: -90.8784, zoom: 9, regionId: 'na-us-mississippi', eventId: 'us-mississippi-2026' }
];

export async function searchLocation(query: string): Promise<SearchResult[]> {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  // First filter predefined matches
  const predefinedMatches = PREDEFINED_LOCATIONS.filter(
    loc => loc.name.toLowerCase().includes(q) || loc.country.toLowerCase().includes(q)
  );

  if (predefinedMatches.length > 0) {
    return predefinedMatches;
  }

  // Attempt Nominatim geocoding fallback
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`);
    if (res.ok) {
      const data = await res.json();
      return data.map((item: any) => ({
        name: item.display_name.split(',')[0],
        country: item.display_name.split(',').slice(-1)[0]?.trim() || '',
        lat: parseFloat(item.lat),
        lng: parseFloat(item.lon),
        zoom: 10
      }));
    }
  } catch (err) {
    console.warn('[Geocoding] Nominatim fetch unavailable, returning demo locations', err);
  }

  return PREDEFINED_LOCATIONS.slice(0, 4);
}

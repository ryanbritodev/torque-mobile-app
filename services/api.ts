import { NHTSARecall } from '../types';
const RECALL_BASE = 'https://api.nhtsa.gov';
const VPIC_BASE = 'https://vpic.nhtsa.dot.gov/api';

export async function fetchRecallsByVin(
  vin: string
): Promise<NHTSARecall[]> {
  try {
    // Decodifica VIN
    const decoded = await decodeVin(vin);

    const make = decoded.Make;
    const model = decoded.Model;
    const year = decoded['Model Year'];

    if (!make || !model || !year) {
      console.log('VIN decode failed');
      return [];
    }

    // Busca recalls do veículo
    const url =
  `${RECALL_BASE}/recalls/recallsByVehicle` +
  `?make=${encodeURIComponent(make)}` +
  `&model=${encodeURIComponent(model)}` +
  `&modelYear=${year}`;

    console.log(url);

    const res = await fetch(url);

    if (!res.ok) {
      console.log('Recall API error:', res.status);
      return [];
    }

    const data = await res.json();

    return data.results ?? [];
  } catch (e) {
    console.log(e);
    return [];
  }
}

export async function fetchFordRecalls(model: string, year: number): Promise<NHTSARecall[]> {
  try {
    const res = await fetch(`${RECALL_BASE}/recalls/recallsByVehicle?make=Ford&model=${encodeURIComponent(model)}&modelYear=${year}`);
    if (!res.ok) throw new Error('err');
    const data = await res.json();
    return data.results ?? [];
  } catch { return []; }
}

export async function decodeVin(
  vin: string
): Promise<Record<string, string>> {
  try {
    const res = await fetch(
      `${VPIC_BASE}/vehicles/DecodeVinValuesExtended/${vin}?format=json`
    );

    if (!res.ok) {
      console.log('VIN decode error:', res.status);
      return {};
    }

    const data = await res.json();

    const item = data.Results?.[0];

    if (!item) return {};

    return {
      Make: item.Make,
      Model: item.Model,
      'Model Year': item.ModelYear,
    };
  } catch (e) {
    console.log(e);
    return {};
  }
}
// Mock data. Replace each export with an API call (see "TODO" notes in the screens).

export type Category = 'Clinic' | 'Bank' | 'Government';

export interface Visit {
  id: string;
  branch: string;
  address: string;
  category: Category;
  service: string;
  date: string; // ISO date
  arrivedAt: string; // HH:mm
  servedAt: string; // HH:mm
  actualWait: number; // minutes
  predictedWait: number; // minutes
  typicalWait: number; // minutes at a typical busy time (used for "time saved")
}

export const VISITS: Visit[] = [
  { id: 'v1', branch: 'Nasr City Clinic', address: 'Abbas El-Akkad St, Nasr City', category: 'Clinic', service: 'General check-up', date: '2026-10-19', arrivedAt: '09:10', servedAt: '09:28', actualWait: 18, predictedWait: 20, typicalWait: 35 },
  { id: 'v2', branch: 'Heliopolis Bank Branch', address: 'Korba, Heliopolis', category: 'Bank', service: 'Account services', date: '2026-10-15', arrivedAt: '11:40', servedAt: '11:52', actualWait: 12, predictedWait: 15, typicalWait: 30 },
  { id: 'v3', branch: 'Cairo Passport Office', address: 'Abbassia, Cairo', category: 'Government', service: 'Passport renewal', date: '2026-10-12', arrivedAt: '08:05', servedAt: '09:05', actualWait: 60, predictedWait: 50, typicalWait: 75 },
  { id: 'v4', branch: 'Maadi Medical Center', address: 'Road 9, Maadi', category: 'Clinic', service: 'Lab tests', date: '2026-10-08', arrivedAt: '17:20', servedAt: '17:34', actualWait: 14, predictedWait: 18, typicalWait: 25 },
  { id: 'v5', branch: 'Zamalek Bank Branch', address: '26th of July St, Zamalek', category: 'Bank', service: 'Card replacement', date: '2026-10-05', arrivedAt: '13:15', servedAt: '13:41', actualWait: 26, predictedWait: 22, typicalWait: 28 },
  { id: 'v6', branch: 'Dokki Civil Registry', address: 'Tahrir St, Dokki', category: 'Government', service: 'ID card', date: '2026-09-30', arrivedAt: '10:00', servedAt: '10:42', actualWait: 42, predictedWait: 45, typicalWait: 70 },
  { id: 'v7', branch: 'Nasr City Clinic', address: 'Abbas El-Akkad St, Nasr City', category: 'Clinic', service: 'Follow-up', date: '2026-09-24', arrivedAt: '15:30', servedAt: '15:39', actualWait: 9, predictedWait: 12, typicalWait: 30 },
  { id: 'v8', branch: 'Heliopolis Bank Branch', address: 'Korba, Heliopolis', category: 'Bank', service: 'Loan inquiry', date: '2026-09-18', arrivedAt: '12:05', servedAt: '12:33', actualWait: 28, predictedWait: 25, typicalWait: 35 },
];

export interface NearbyBranch {
  id: string;
  name: string;
  category: Category;
  distance: number; // metres from the user
}

export const NEARBY_BRANCHES: NearbyBranch[] = [
  { id: 'b1', name: 'Nasr City Clinic', category: 'Clinic', distance: 80 },
  { id: 'b2', name: 'Heliopolis Bank Branch', category: 'Bank', distance: 140 },
  { id: 'b3', name: 'Cairo Passport Office', category: 'Government', distance: 620 },
];

export interface LiveReport {
  id: string;
  branchId: string;
  queue: number; // people ahead
  minutes: number; // reported wait
  ago: string;
}

export const LIVE_REPORTS: LiveReport[] = [
  { id: 'r1', branchId: 'b1', queue: 6, minutes: 20, ago: '2 min ago' },
  { id: 'r2', branchId: 'b1', queue: 4, minutes: 15, ago: '11 min ago' },
  { id: 'r3', branchId: 'b2', queue: 3, minutes: 10, ago: '5 min ago' },
  { id: 'r4', branchId: 'b3', queue: 18, minutes: 55, ago: '8 min ago' },
];

export interface Favourite {
  id: string;
  name: string;
  category: Category;
}

export const FAVOURITES: Favourite[] = [
  { id: 'b1', name: 'Nasr City Clinic', category: 'Clinic' },
  { id: 'b2', name: 'Heliopolis Bank Branch', category: 'Bank' },
  { id: 'b4', name: 'Maadi Medical Center', category: 'Clinic' },
];

export const BRANCHES = ['Downtown', 'City Mall', 'Airport Road', 'North Plaza'];
export const TIMES = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];
const BASE_WAIT = [10, 35, 45, 30, 50, 40, 20, 15, 25];

const nextDays = (n = 7) =>
  Array.from({ length: n }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      key: d.toISOString().slice(0, 10),
      label: d.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' }),
    };
  });
export const DAYS = nextDays();

export const forecast = (dayIdx, branch) =>
  BASE_WAIT.map((w, i) =>
    Math.max(5, Math.round(w + ((dayIdx * 7 + branch.length * 3 + i * 5) % 15) - 7))
  );

export const level = (m) => (m <= 20 ? 'low' : m <= 40 ? 'mid' : 'high');
export const COLORS = { low: '#22a06b', mid: '#f5a623', high: '#e5484d' };
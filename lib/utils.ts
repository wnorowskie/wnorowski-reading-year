const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function formatMonthLabel(monthIndex: number): string {
  return MONTH_NAMES[monthIndex] ?? "";
}

export function formatNumber(value: number): string {
  return value.toLocaleString("en-US");
}

export function average(numbers: number[]): number | null {
  if (!numbers.length) return null;
  const sum = numbers.reduce((acc, val) => acc + val, 0);
  return Number((sum / numbers.length).toFixed(2));
}

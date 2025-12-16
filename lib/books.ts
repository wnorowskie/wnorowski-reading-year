import { familyReadingYear2025 } from "./data";
import type { Book, FamilyMember } from "./types";

export interface BookStats {
  totalBooks: number;
  totalPages: number;
  avgRating: number | null;
  genreCounts: Record<string, number>;
  authorCounts: Record<string, number>;
  topGenres: { label: string; count: number }[];
  topAuthors: { label: string; count: number }[];
  longestBook: Book | null;
  shortestBook: Book | null;
}

export interface FamilyStats extends BookStats {
  memberBookCounts: { id: string; name: string; count: number }[];
  topReader: { id: string; name: string; count: number } | null;
}

export function getAllMembers(): FamilyMember[] {
  return familyReadingYear2025.members;
}

export function getMemberById(id: string): FamilyMember | undefined {
  return familyReadingYear2025.members.find((member) => member.id === id);
}

export function getMemberBooks(memberId: string): Book[] {
  const member = getMemberById(memberId);
  if (!member) return [];
  return [...member.books].sort((a, b) => a.dateFinished.localeCompare(b.dateFinished));
}

export function getAllFamilyBooks(): Book[] {
  return familyReadingYear2025.members.flatMap((member) => member.books);
}

export function groupBooksByMonth(books: Book[]): Record<number, Book[]> {
  const grouped: Record<number, Book[]> = {};
  for (let i = 0; i < 12; i += 1) {
    grouped[i] = [];
  }

  books.forEach((book) => {
    const monthIndex = new Date(book.dateFinished).getMonth();
    grouped[monthIndex]?.push(book);
  });

  return grouped;
}

function sortCounts(counts: Record<string, number>): { label: string; count: number }[] {
  return Object.entries(counts)
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count);
}

export function computeStats(books: Book[]): BookStats {
  const totalBooks = books.length;
  const totalPages = books.reduce((sum, book) => sum + (book.pages ?? 0), 0);

  const ratings = books
    .map((book) => book.rating)
    .filter((rating): rating is number => typeof rating === "number");
  const avgRating = ratings.length
    ? Number((ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length).toFixed(2))
    : null;

  const genreCounts: Record<string, number> = {};
  const authorCounts: Record<string, number> = {};
  const booksWithPages = books.filter((book) => typeof book.pages === "number");

  books.forEach((book) => {
    if (book.genre) {
      genreCounts[book.genre] = (genreCounts[book.genre] ?? 0) + 1;
    }
    authorCounts[book.author] = (authorCounts[book.author] ?? 0) + 1;
  });

  const longestBook = booksWithPages.length
    ? booksWithPages.reduce((max, current) => (current.pages! > max.pages! ? current : max))
    : null;

  const shortestBook = booksWithPages.length
    ? booksWithPages.reduce((min, current) => (current.pages! < min.pages! ? current : min))
    : null;

  return {
    totalBooks,
    totalPages,
    avgRating,
    genreCounts,
    authorCounts,
    topGenres: sortCounts(genreCounts).slice(0, 5),
    topAuthors: sortCounts(authorCounts).slice(0, 5),
    longestBook,
    shortestBook,
  };
}

export function computeFamilyStats(): FamilyStats {
  const allBooks = getAllFamilyBooks();
  const baseStats = computeStats(allBooks);

  const memberBookCounts = familyReadingYear2025.members.map((member) => ({
    id: member.id,
    name: member.name,
    count: member.books.length,
  }));

  const topReader = memberBookCounts.length
    ? memberBookCounts.reduce((max, member) => (member.count > max.count ? member : max))
    : null;

  return {
    ...baseStats,
    memberBookCounts,
    topReader,
  };
}

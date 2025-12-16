# Wnorowski Family Reading Year 2025 — Project Specification

## 1. Project Overview

A **cozy, family-oriented web app** celebrating the Wnorowski family's collective reading year (2025). Each family member (Grace, Alexa, Mom, Dad) has their own dedicated page summarizing their reading activity, while a shared home page highlights the family's combined reading achievements.

This is a **personal gift/keepsake**, not a multi-user product. The tone should be warm, celebratory, and bookish.

---

## 2. Tech Stack

| Layer         | Technology                                      |
| ------------- | ----------------------------------------------- |
| **Framework** | Next.js 14+ (App Router, `/app` directory)      |
| **Language**  | TypeScript                                      |
| **Styling**   | Tailwind CSS                                    |
| **Data**      | Static JSON/TS objects (imported at build time) |
| **Hosting**   | Vercel (static site behavior)                   |
| **Images**    | Goodreads cover URLs (external)                 |

### Hard Constraints

- **No backend, API routes, databases, or authentication**
- **No external charting libraries** (Chart.js, Recharts, etc.) — use CSS/Tailwind for simple visualizations
- **No global state libraries** (Redux, Zustand, etc.)
- **Minimal dependencies** — stick to Next.js + Tailwind essentials
- **Proper TypeScript types** — avoid `any`

---

## 3. Features Summary

### Home Page (Family Overview)

- Hero section with family title and celebratory message
- Combined family stats:
  - Total books read (all members)
  - Total pages read (all members)
  - Top reader (who read the most books)
  - Most popular genres across the family
  - Most common authors
- Navigation cards/links to each family member's page

### Individual Member Pages (Grace, Alexa, Mom, Dad)

Each member page is a **single scrollable page** containing:

1. **Summary Section**

   - Member name + reading year
   - Total books read
   - Total pages read
   - Average rating
   - Top genres

2. **Book Grid**

   - Responsive grid of book covers
   - No click-through to detail pages (stretch goal)
   - Show title, author, rating on hover or below cover

3. **Timeline View**

   - Books grouped by month (Jan–Dec)
   - Visual representation of reading pace
   - Month headings with book count

4. **Stats Section**
   - Genre breakdown (list or simple bar chart)
   - Books per month (CSS-based bar chart)
   - Additional stats as desired (longest book, shortest book, etc.)

### Stretch Goal (Optional)

- Individual book detail modals or pages (`/[member]/books/[id]`)

---

## 4. Information Architecture

### Routes

```
/                           # Home — Family overview
/grace                      # Grace's reading year page
/alexa                      # Alexa's reading year page
/mom                        # Mom's reading year page
/dad                        # Dad's reading year page
```

### Navigation

A persistent **nav bar** across all pages with links to:

- Home (Family Overview)
- Grace
- Alexa
- Mom
- Dad

---

## 5. Folder Structure

```text
app/
  layout.tsx                # Root layout with nav bar
  page.tsx                  # Home page (family overview)

  grace/
    page.tsx                # Grace's reading year page
  alexa/
    page.tsx                # Alexa's reading year page
  mom/
    page.tsx                # Mom's reading year page
  dad/
    page.tsx                # Dad's reading year page

  components/
    NavBar.tsx              # Persistent navigation
    NavLink.tsx             # Active-state nav link
    FamilyStatsCard.tsx     # Stat card for home page
    MemberCard.tsx          # Card linking to member page
    MemberSummary.tsx       # Summary section for member page
    BookGrid.tsx            # Grid of book covers
    BookTile.tsx            # Individual book in grid
    Timeline.tsx            # Timeline container
    MonthGroup.tsx          # Books for a single month
    StatsSection.tsx        # Stats visualizations
    BarChart.tsx            # Simple CSS bar chart
    GenreList.tsx           # Genre breakdown list

lib/
  types.ts                  # TypeScript interfaces
  data.ts                   # All family reading data
  books.ts                  # Data helper functions
  utils.ts                  # Formatting utilities

public/
  # Any local assets if needed

styles/
  globals.css               # Global styles + Tailwind imports

tailwind.config.ts
tsconfig.json
next.config.mjs
package.json
```

---

## 6. Data Model

### Types (`lib/types.ts`)

```typescript
export interface Book {
  id: string; // slug, e.g., "fourth-wing"
  title: string;
  author: string;
  coverImageUrl: string; // Goodreads URL
  dateFinished: string; // ISO string, e.g., "2025-05-12"
  rating?: number; // 1–5 (optional)
  pages?: number;
  genre?: string;
  goodreadsUrl?: string;
}

export interface FamilyMember {
  id: string; // slug for URL, e.g., "grace"
  name: string; // Display name, e.g., "Grace"
  books: Book[];
}

export interface FamilyReadingYear {
  year: number;
  familyName: string; // "Wnorowski"
  members: FamilyMember[];
}
```

### Data Structure (`lib/data.ts`)

```typescript
import type { FamilyReadingYear } from "./types";

export const familyReadingYear2025: FamilyReadingYear = {
  year: 2025,
  familyName: "Wnorowski",
  members: [
    {
      id: "grace",
      name: "Grace",
      books: [
        // Book entries from Goodreads
      ],
    },
    {
      id: "alexa",
      name: "Alexa",
      books: [
        // Book entries from Goodreads
      ],
    },
    {
      id: "mom",
      name: "Mom",
      books: [
        // Book entries from Goodreads
      ],
    },
    {
      id: "dad",
      name: "Dad",
      books: [
        // Book entries from Goodreads
      ],
    },
  ],
};
```

---

## 7. Data Helpers (`lib/books.ts`)

```typescript
import { familyReadingYear2025 } from "./data";
import type { Book, FamilyMember } from "./types";

// Get all members
export function getAllMembers(): FamilyMember[] {
  return familyReadingYear2025.members;
}

// Get a single member by ID
export function getMemberById(id: string): FamilyMember | undefined {
  return familyReadingYear2025.members.find((m) => m.id === id);
}

// Get all books for a member, sorted by date
export function getMemberBooks(memberId: string): Book[] {
  const member = getMemberById(memberId);
  if (!member) return [];
  return [...member.books].sort((a, b) =>
    a.dateFinished.localeCompare(b.dateFinished)
  );
}

// Get all books from all members (for family stats)
export function getAllFamilyBooks(): Book[] {
  return familyReadingYear2025.members.flatMap((m) => m.books);
}

// Group books by month (0-11)
export function groupBooksByMonth(books: Book[]): Record<number, Book[]> {
  const grouped: Record<number, Book[]> = {};
  for (let i = 0; i < 12; i++) grouped[i] = [];

  books.forEach((book) => {
    const monthIndex = new Date(book.dateFinished).getMonth();
    grouped[monthIndex].push(book);
  });

  return grouped;
}

// Compute stats for a list of books
export function computeStats(books: Book[]) {
  const totalBooks = books.length;
  const totalPages = books.reduce((sum, b) => sum + (b.pages ?? 0), 0);

  const ratings = books
    .map((b) => b.rating)
    .filter((r): r is number => typeof r === "number");
  const avgRating = ratings.length
    ? ratings.reduce((a, b) => a + b, 0) / ratings.length
    : null;

  // Genre counts
  const genreCounts: Record<string, number> = {};
  books.forEach((b) => {
    if (b.genre) {
      genreCounts[b.genre] = (genreCounts[b.genre] || 0) + 1;
    }
  });

  // Author counts
  const authorCounts: Record<string, number> = {};
  books.forEach((b) => {
    authorCounts[b.author] = (authorCounts[b.author] || 0) + 1;
  });

  // Top genres (sorted)
  const topGenres = Object.entries(genreCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Top authors (sorted)
  const topAuthors = Object.entries(authorCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Longest and shortest book
  const booksWithPages = books.filter((b) => b.pages);
  const longestBook = booksWithPages.length
    ? booksWithPages.reduce((max, b) => (b.pages! > max.pages! ? b : max))
    : null;
  const shortestBook = booksWithPages.length
    ? booksWithPages.reduce((min, b) => (b.pages! < min.pages! ? b : min))
    : null;

  return {
    totalBooks,
    totalPages,
    avgRating,
    genreCounts,
    authorCounts,
    topGenres,
    topAuthors,
    longestBook,
    shortestBook,
  };
}

// Family-wide stats
export function computeFamilyStats() {
  const allBooks = getAllFamilyBooks();
  const baseStats = computeStats(allBooks);

  // Per-member book counts for "top reader"
  const memberBookCounts = familyReadingYear2025.members.map((m) => ({
    name: m.name,
    id: m.id,
    count: m.books.length,
  }));
  const topReader = memberBookCounts.reduce((max, m) =>
    m.count > max.count ? m : max
  );

  return {
    ...baseStats,
    memberBookCounts,
    topReader,
  };
}
```

---

## 8. Page Specifications

### Home Page (`/`)

**Purpose:** Celebrate the family's collective reading year and navigate to individual pages.

**Sections:**

1. **Hero**

   - Title: "The Wnorowski Family Reading Year 2025"
   - Subtitle: Celebratory message (e.g., "A year of stories, shared together")

2. **Family Stats Cards**

   - Total books read (all members combined)
   - Total pages read
   - Top Reader: [Name] with [X] books
   - Most popular genre
   - Most read author

3. **Member Navigation**
   - 4 cards (one per family member)
   - Each card shows:
     - Member name
     - Book count
     - Mini book cover collage or single featured cover
   - Clicking navigates to their page

**Layout:** Centered content, `max-w-5xl`, responsive grid for stats and member cards.

---

### Individual Member Pages (`/grace`, `/alexa`, `/mom`, `/dad`)

**Purpose:** A single scrollable page showcasing one member's reading year.

**Sections (in order):**

1. **Summary Header**

   - Member name + "2025 Reading Year"
   - Key stats: total books, total pages, avg rating
   - Top 3 genres as tags/pills

2. **Book Grid**

   - Responsive grid: `grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6`
   - Each tile:
     - Cover image (aspect ratio preserved)
     - Title (truncated if long)
     - Author
     - Rating (stars or number)
   - No click-through (stretch goal)

3. **Timeline**

   - Months displayed in order (Jan–Dec)
   - Each month shows:
     - Month name heading
     - Count of books finished
     - Small cover thumbnails for books that month
   - Empty months can be shown or hidden (preference)

4. **Stats Section**
   - Genre breakdown (horizontal bar chart using Tailwind widths)
   - Books per month (12-bar chart)
   - Fun facts:
     - Longest book
     - Shortest book
     - Most read author
     - 5-star reads count

**Layout:** Single column, section dividers, smooth scroll between sections.

---

## 9. Styling Guidelines

### Color Palette (Cozy Family Vibe)

- **Background:** `bg-amber-50` or `bg-stone-50`
- **Cards:** `bg-white` with `shadow-md rounded-xl`
- **Text:** `text-stone-800` / `text-stone-600`
- **Accents:** `bg-amber-500`, `text-amber-700` for highlights
- **Nav:** Subtle, perhaps `bg-white/80 backdrop-blur`

### Typography

- Headings: `font-serif` for warmth (consider adding a Google Font like Merriweather or Playfair Display)
- Body: Default sans-serif (`font-sans`)

### Spacing

- Consistent padding: `p-4`, `p-6`, `p-8`
- Section margins: `my-12` or `my-16`
- Max width container: `max-w-5xl mx-auto px-4`

### Components

- **Cards:** `rounded-xl shadow-md` with hover: `hover:shadow-lg transition`
- **Book covers:** `rounded-lg overflow-hidden aspect-[2/3]`
- **Buttons/Links:** Subtle hover states, no harsh borders

### Accessibility

- Alt text on all images
- Proper heading hierarchy (h1 for page title, h2 for sections, h3 for subsections)
- Sufficient color contrast
- Focus states on interactive elements

---

## 10. Component Specifications

### `NavBar.tsx`

- Fixed or sticky at top
- Links: Home, Grace, Alexa, Mom, Dad
- Active link styling
- Mobile: hamburger menu or horizontal scroll

### `BookTile.tsx`

```typescript
interface BookTileProps {
  book: Book;
  showDetails?: boolean; // Show title/author below cover
}
```

### `MonthGroup.tsx`

```typescript
interface MonthGroupProps {
  month: number; // 0-11
  books: Book[];
  showEmpty?: boolean; // Show month even if 0 books
}
```

### `BarChart.tsx`

Simple CSS-based bar chart:

```typescript
interface BarChartProps {
  data: { label: string; value: number }[];
  maxValue?: number;
  barColor?: string;
}
```

### `MemberSummary.tsx`

```typescript
interface MemberSummaryProps {
  member: FamilyMember;
  stats: ReturnType<typeof computeStats>;
}
```

---

## 11. Data Collection Notes

For each family member, gather from Goodreads:

- Book title
- Author name
- Cover image URL
- Date finished (or approximate month)
- Rating (1-5, if available)
- Page count
- Genre (can be inferred or manually assigned)
- Goodreads URL (optional)

**No personal notes needed** — unlike Victoria's app, this version does not include personalized messages per book.

### Data Entry Format

Follow the same structure as Victoria's `data.ts`:

```typescript
{
  id: "book-slug",
  title: "Book Title",
  author: "Author Name",
  coverImageUrl: "https://i.gr-assets.com/...",
  dateFinished: "2025-MM-DD",
  rating: 4,
  pages: 350,
  genre: "Fiction",
  goodreadsUrl: "https://www.goodreads.com/book/show/..."
}
```

---

## 12. Development Phases

### Phase 1: Setup & Data

1. Create new repo (`wnorowski-reading-year`)
2. Initialize Next.js + Tailwind project
3. Set up folder structure
4. Define TypeScript types
5. Create data file with placeholder/partial data
6. Implement data helper functions

### Phase 2: Layout & Navigation

1. Build root layout with NavBar
2. Style global theme (colors, fonts)
3. Create NavLink component with active states
4. Test navigation between routes

### Phase 3: Home Page

1. Build hero section
2. Implement family stats cards
3. Create member navigation cards
4. Connect to data helpers

### Phase 4: Member Pages

1. Build MemberSummary component
2. Build BookGrid + BookTile components
3. Build Timeline + MonthGroup components
4. Build StatsSection + BarChart components
5. Assemble member page template
6. Create all 4 member pages (can use shared component with different data)

### Phase 5: Polish & Deploy

1. Responsive testing
2. Accessibility review
3. Performance optimization (image sizing)
4. Deploy to Vercel
5. Final review and adjustments

### Stretch Goals (Optional)

- Book detail modals on click
- Animated transitions between sections
- "Family fun facts" section on home page
- Print-friendly styles

---

## 13. Estimated Timeline

| Phase               | Duration       |
| ------------------- | -------------- |
| Setup & Data        | 1-2 hours      |
| Layout & Navigation | 1-2 hours      |
| Home Page           | 2-3 hours      |
| Member Pages        | 3-4 hours      |
| Polish & Deploy     | 1-2 hours      |
| **Total**           | **8-13 hours** |

_Note: Data collection from Goodreads will add additional time depending on how many books each family member read._

---

## 14. Dependencies

### Package.json (minimal)

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "autoprefixer": "^10.0.0",
    "postcss": "^8.0.0",
    "tailwindcss": "^3.0.0",
    "typescript": "^5.0.0"
  }
}
```

### Optional: Google Fonts

Add to `layout.tsx` or `globals.css` for a warmer serif font for headings.

---

## 15. Questions Resolved

| Question                 | Answer                                                        |
| ------------------------ | ------------------------------------------------------------- |
| Family name              | Wnorowski                                                     |
| Members                  | Grace, Alexa, Mom, Dad                                        |
| Reading goals            | None — summary only, not goal-oriented                        |
| Features per person      | Summary, book grid, timeline, stats                           |
| Personal notes           | No                                                            |
| Personal letters         | No                                                            |
| Home page                | Family overview with combined stats                           |
| Navigation               | Nav bar for switching between pages                           |
| Book detail pages        | No (stretch goal)                                             |
| Design tone              | Cozy, warm, family-oriented                                   |
| Per-person customization | None — uniform styling                                        |
| Year                     | 2025                                                          |
| Data source              | Goodreads (same format as Victoria's app, minus personalNote) |
| Hosting                  | Vercel                                                        |
| Repository               | New repo (wnorowski-reading-year)                             |

---

## 16. Reference

This spec is based on the existing `book-gift` project built for Victoria. Key differences:

| Feature           | Victoria's App           | Family App                 |
| ----------------- | ------------------------ | -------------------------- |
| Users             | 1 (Victoria)             | 4 (Grace, Alexa, Mom, Dad) |
| Structure         | Multi-page feature-based | Single page per person     |
| Personal notes    | Yes                      | No                         |
| Heartfelt letter  | Yes                      | No                         |
| Reading goal      | Yes (50 books)           | No                         |
| Book detail pages | Yes                      | No (stretch goal)          |
| Home page         | Hero + highlights        | Family stats + member nav  |

---

_Document created: December 15, 2025_
_Project: Wnorowski Family Reading Year 2025_

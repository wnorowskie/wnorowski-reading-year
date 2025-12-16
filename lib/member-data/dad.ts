import type { FamilyMember } from "../types";

export const dadReadingYear: FamilyMember = {
  id: "dad",
  name: "Dad",
  books: [
    {
      id: "creative-act",
      title: "The Creative Act: A Way of Being",
      author: "Rick Rubin",
      coverImageUrl:
        "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1660759251l/61885037.jpg",
      dateFinished: "2025-02-02",
      rating: 4,
      pages: 432,
      genre: "Nonfiction",
      goodreadsUrl: "https://www.goodreads.com/book/show/61885037-the-creative-act",
    },
    {
      id: "elon-musk",
      title: "Elon Musk",
      author: "Walter Isaacson",
      coverImageUrl:
        "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1686228520l/27213285.jpg",
      dateFinished: "2025-05-28",
      rating: 3,
      pages: 688,
      genre: "Biography",
      goodreadsUrl: "https://www.goodreads.com/book/show/27213285-elon-musk",
    },
  ],
};

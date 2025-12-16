export interface Book {
  id: string;
  title: string;
  author: string;
  coverImageUrl: string;
  dateFinished: string;
  rating?: number;
  pages?: number;
  genre?: string;
  goodreadsUrl?: string;
}

export interface FamilyMember {
  id: string;
  name: string;
  books: Book[];
}

export interface FamilyReadingYear {
  year: number;
  familyName: string;
  members: FamilyMember[];
}

import { notFound } from "next/navigation";
import { MemberSummary } from "./MemberSummary";
import { BookGrid } from "./BookGrid";
import { Timeline } from "./Timeline";
import { StatsSection } from "./StatsSection";
import { computeStats, getMemberById, getMemberBooks, groupBooksByMonth } from "@/lib/books";

interface MemberPageProps {
  memberId: string;
}

export function MemberPage({ memberId }: MemberPageProps) {
  const member = getMemberById(memberId);
  if (!member) {
    notFound();
  }

  const books = getMemberBooks(memberId);
  const stats = computeStats(member.books);
  const monthGroups = groupBooksByMonth(member.books);

  return (
    <div className="space-y-10">
      <MemberSummary member={member} stats={stats} />
      <BookGrid books={books} />
      <Timeline monthGroups={monthGroups} />
      <StatsSection stats={stats} monthGroups={monthGroups} books={member.books} />
    </div>
  );
}

import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug?: string[] }>;
};

const NotesPage = async ({ params }: Props) => {
  const { slug } = await params;
  const first = slug?.[0];
  const tag = first === "All" || !first ? undefined : first;

  try {
    const notes = await fetchNotes({ page: 1, tag });
    return <NotesClient initialData={notes} tag={tag} />;
  } catch {
    return notFound();
  }
};

export default NotesPage;


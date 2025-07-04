import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug?: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const first = slug?.[0];
  const tag = first === "All" || !first ? undefined : first;
  const tagTitle = tag || "All";

  try {
    await fetchNotes({ page: 1, tag });

    return {
      title: `${tagTitle} | NoteHub`,
      description: `Browse notes tagged with "${tagTitle}".`,
      openGraph: {
        title: `${tagTitle} | NoteHub`,
        description: `Browse notes tagged with "${tagTitle}".`,
        siteName: "NoteHub",
        images: [
          {
            url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
            width: 1200,
            height: 630,
            alt: "NoteHub",
          },
        ],
      },
    };
  } catch {
    return {
      title: "Not Found | NoteHub",
      description: "The requested notes could not be found.",
    };
  }
}

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

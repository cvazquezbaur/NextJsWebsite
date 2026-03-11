import { db } from "@/lib/db";
import { mediaFiles } from "@/lib/schema";
import { desc, eq } from "drizzle-orm";
import Gallery from "@/components/GalleryContainer";
import TextContainer from "@/components/TextContainer";

interface MediaItem {
  id: number;
  file_name: string;
  url: string;
  content_type: string | null;
  size_bytes: number | null;
  created_at: Date | null;
}

export default async function TechPage() {
  let media: MediaItem[] = [];
  try {
    media = await db
      .select()
      .from(mediaFiles)
      .where(eq(mediaFiles.category, "tech"))
      .orderBy(desc(mediaFiles.created_at));
  } catch (error) {
    console.error("Failed to fetch gallery:", error);
  }

  return (
    <main style={{ padding: '4rem', minHeight: '60vh' }}>
      <TextContainer 
        textSections={[{ 
          title: "Tech Portfolio", 
          content: [
            "Welcome to my tech portfolio! Here, you'll find a curated selection of my projects and accomplishments in the field of technology. From web development to software engineering, I've worked on a variety of exciting initiatives that showcase my skills and passion for innovation.",
            "Feel free to explore the different sections to learn more about my work, the technologies I've used, and the impact these projects have had. Whether you're a fellow developer, a potential collaborator, or just curious about what I do, I hope you find something that inspires you.",
            "Thank you for visiting my tech portfolio. If you'd like to get in touch or discuss potential opportunities, please don't hesitate to reach out!"
          ] 
        }]}
      >
        <Gallery items={media} />
      </TextContainer>
    </main>
  );
}

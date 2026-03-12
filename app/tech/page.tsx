import { db } from "@/lib/db";
import { mediaFiles } from "@/lib/schema";
import { desc, eq } from "drizzle-orm";
import Gallery from "@/components/GalleryContainer";
import TextContainer from "@/components/TextContainer";
import { Download } from "lucide-react";

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
        textSections={[
          { 
            title: "Tech Portfolio", 
            content: [
              "With an educational background in Mathematics and Computer Science from Gonzaga University, I have built a career that spans government IT, enterprise banking, and public health technology. I am passionate about building tools that have a real impact on people's lives, and I bring a unique blend of technical skill, creative problem-solving, and strong communication to every team I work with.",
            ] 
          },
          {
            title: "Professional Experience",
            content: [
              "Application Developer — New Mexico Department of Health (2025–Present): I currently work as an application developer building internal tools to manage public health data and initiatives across the state of New Mexico. I am responsible for redesigning and developing public-facing web applications such as the NMHealth website, utilizing technologies like C#, .NET, Blazor, SQL Server, and Azure DevOps. I also build and maintain RESTful APIs and services that support critical health data infrastructure.",
              "Full Stack Android Developer — TD Bank via FDM Group (2022–2024): I worked on TD Bank's Payments Pod as a full stack Android developer for roughly three years. I participated in a wide range of projects including building new features for the TD mobile banking app using Kotlin, Jetpack Compose, and Spring Boot microservices. I also developed internal tools for the Payments team to manage their microservices and cloud infrastructure on AWS (EC2, S3, Lambda, RDS). I worked extensively with CI/CD pipelines via Jenkins and GitHub Actions, and collaborated in an Agile/Scrum environment across multiple cross-functional teams.",
              "IT Contractor — New Mexico State Legislature (2021): I worked as the assistant IT Manager for the New Mexico State Senate chamber. This was a fast-paced, high-pressure environment where I gained hands-on experience with networking, systems administration, and IT project management. I also supported the rollout of a new budget management system for the entire state government.",
            ]
          },
          {
            title: "Technical Skills",
            content: [
              "Languages: Java, Kotlin, C#, Python, TypeScript, JavaScript, SQL, HTML/CSS",
              "Frameworks & Libraries: Next.js, React, .NET, Blazor, Spring Boot, Jetpack Compose, Tailwind CSS, Drizzle ORM",
              "Cloud & Infrastructure: AWS (EC2, S3, Lambda, RDS), Azure DevOps, Vercel, Neon (Serverless Postgres)",
              "Tools & Practices: Git, GitHub Actions, Jenkins, CI/CD, Agile/Scrum, REST APIs, PostgreSQL, SQL Server",
            ]
          },
          {
            title: "Education",
            content: [
              "Gonzaga University — B.S. in Mathematics and Computer Science (2015–2019): I received a well-rounded Liberal Arts education at Gonzaga, which allowed me to explore a variety of subjects and disciplines. I attended on a music scholarship for voice while pursuing my STEM degrees, giving me a unique perspective that blends analytical thinking with creative expression.",
            ]
          },
          {
            title: "Personal Projects",
            content: [
              "Portfolio Website (This Site): Built from scratch using Next.js, React, TypeScript, and Tailwind CSS. Features include credential-based authentication, media upload and categorization via Vercel Blob and Neon Postgres, a contact form powered by Resend, and a custom admin dashboard. Deployed on Vercel with a fully serverless architecture.",
              "AI Grant Tracker: Developed a grant tracking application for a startup that leverages AI to write grant proposals. The tool helps organize, track, and manage the grant application lifecycle, streamlining the process of identifying funding opportunities and generating proposal drafts with AI assistance.",
              "Ski Santa Fe Carpool & Parking App: An in-progress mobile application built with Flutter designed to organize carpools and track parking capacity limits at Ski Santa Fe. The app aims to reduce congestion, promote sustainable transportation to the mountain, and help skiers coordinate rides during peak days.",
            ]
          },
        ]}
      >
        <Gallery items={media} />
      </TextContainer>

      {/* Resume Download */}
      <section className="mx-auto my-8 w-full max-w-3xl sm:max-w-4xl md:max-w-5xl flex justify-center">
        <a
          href="/CarlosAndresVazquezBaur_Resume.pdf"
          download
          className="inline-flex items-center gap-3 bg-white hover:bg-zinc-200 text-black font-bold py-3 px-8 rounded-xl transition-all shadow-lg"
        >
          <Download className="w-5 h-5" />
          <span>Download My Resume</span>
        </a>
      </section>
    </main>
  );
}

import TextContainer from "@/components/TextContainer";

export default function TechPage() {
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
      />
    </main>
  );
}

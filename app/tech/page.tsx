import TextContainer from "@/components/TextContainer";

export default function TechPage() {
  return (
    <main style={{ padding: '4rem', minHeight: '60vh' }}>
      <TextContainer 
        textSections={[[
            "Tech Progress",
            [
                "Current tech projects"
            ]
        ]]}
      />
    </main>
  );
}

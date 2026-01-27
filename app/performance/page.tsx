import TextContainer from "@/components/TextContainer";

export default function PerformancePage() {
  return (
    <main style={{ padding: '4rem', minHeight: '60vh' }}>
      <TextContainer 
        textSections={[{ title: "Performances", content: ["Explore my performances in theater, music, and more"] }]}
      />
    </main>
  );
}

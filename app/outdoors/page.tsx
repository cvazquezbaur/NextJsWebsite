import TextContainer from "@/components/TextContainer";

export default function OutdoorsPage() {
  return (
    <main style={{ padding: '4rem', minHeight: '60vh' }}>
      <TextContainer 
        textSections={
          [
            [
              "Outdoors",
              ["Outdoor adventures, photos, and trip logs."],
            ]
          ]
        }
      />
    </main>
  );
}

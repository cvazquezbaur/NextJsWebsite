import TextContainer from "@/components/TextContainer"

export default function AboutPage() {
  return (
    <main style={{ padding: '4rem', minHeight: '60vh' }}>
        <TextContainer 
            textSections={
                [
                    [
                        "About Me",
                        ["This is a section about me", "This is the second Paragraph about me."],
                    ]
                ]
            }
        />
    </main>
  );
}

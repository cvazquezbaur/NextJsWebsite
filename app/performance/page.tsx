import TextContainer from "@/components/TextContainer";

export default function PerformancePage() {
  return (
    <main style={{ padding: '4rem', minHeight: '60vh' }}>
      <TextContainer 
        textSections={[[
            "Performance Information",
            [
                "Performance projects, benchmarks, and optimizations will be showcased here."
            ]
            
        ]]}
      />
    </main>
  );
}

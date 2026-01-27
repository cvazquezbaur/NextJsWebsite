import TextContainer from "@/components/TextContainer";

export default function OutdoorsPage() {
  return (
    <main style={{ padding: '4rem', minHeight: '60vh' }}>
      <TextContainer 
        textSections={
          [{
            title: "Outdoor Adventures",
            content: [
              "Welcome to my outdoor adventures page! Here, I share my passion for exploring the great outdoors through hiking, camping, and various outdoor activities. Join me as I document my journeys, share tips and tricks for outdoor enthusiasts, and showcase the breathtaking beauty of nature.",
              "Whether you're an experienced adventurer or just starting to explore the outdoors, I hope to inspire you to get outside and experience the wonders of nature. From scenic trails to hidden gems, I'll take you along on my adventures and provide insights into the best spots to visit, gear recommendations, and safety tips for outdoor exploration.",
              "So grab your backpack, lace up your hiking boots, and let's embark on this exciting journey together! Stay tuned for regular updates on my latest outdoor escapades and feel free to share your own experiences in the comments section below.",
            ],
          }]
        }
      />
    </main>
  );
}

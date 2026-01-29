import Gallery from "@/components/GalleryContainer";
import TextContainer from "@/components/TextContainer";

export default function PerformancePage() {
  const textBody1 = [{
    title: "Performance",
    content: [
      "Growing up in Santa Fe, New Mexico, I was deeply immersed in the arts from a young age. With a father who was a drummer in two local bands and a grandfather who was a multi-talented musician in Mariachi bands, music was an integral part of my upbringing. From as soon as I could talk, I was singing along to any and every song I liked. I would sing and dance around the house and at every family function we had.",
      "To facilitate this passion, my parents had me join the children's chorus at the St. Francis Cathedral Basilica when I was about 4 years old. With the prominence of the Cathedral in the Santa Fe community, I was able to actually perform at a young age in front of large crowds. The director, Carmen Florez-Mansi, was strict but nurturing, and she helped me develop a strong foundation in music and performance. Through some not so gentle nudging from her, I was able to realize how vital music and performance were to my identity and sense of self. I continued to sing in the choir and perform in the marimba band at the Cathedral throughout my childhood, which further fueled my love for music.",
      "At the age of 7, I joined a local children's theater group called Pandemonium Productions. Through the tutelage and encouragement of the director, Christopher Leslie, I was able to grow as both a performer and as a person. As a young Latino, I struggled heavily with sqauring the kind of man that I was growing into and wanting to become with what I was told to be as a Mexican. The theater became a safe space for me to explore different facets of my identity and express myself freely as well as provided me with a wealth of supportive and strong male role models in the mold that I admired and saw myself becoming. I performed in 3 shows a year for nearly 10 years, taking on lead roles in many of them, and developed a deep love for storytelling and the transformative power of theater.",
      "I then attended Gonzaga University on a music scholarship for voice, where I was able to further hone my skills as a performer and musician. I was a member of the Gonzaga University Concert and Chamber Choirs, participating in recruitment tours and performances across the Pacific Northwest and in Italy. I also participated in several performances with the Gonzaga University Theater Department, where my biggest role was playing Bottom in A Midsummer Night's Dream. My time at Gonzaga University allowed me to grow as a performer and musician, and really cement my love for the arts.",
      "Upon returning to Santa Fe post Covid in 2021, I sought out opportunities to continue performing and sharing my love for music and theater with others. I began singing with the Cathedral Basilica choir once again along with joining the Santa Fe Symphony Chorus. I was then asked to join a professional local musical theater group where I performed in four full-scale productions and many galas and small musical review concerts. After a few years, I was given a contract with both the Cathedral Basilica and the Santa Fe Symphony Chorus to be a paid professional singer for their ensembles, along with being offered several one-off paid gigs for various events and functions around Santa Fe such as opera previews and private parties.",
      "Singing and performing have always been a vital part of my life and identity. They have provided me with a sense of purpose, community, and self-expression that I cherish deeply. They, and the communities they have facilitated for me, have allowed me to really dig deep into identity and masculinity, and afforded me the opportunity to become a strong and healthy male role model for other young men of color who may be feeling as lost as I was growing up. I look forward to continuing to share my love for music and performance with others for many years to come.",
    ],
  }];

  return (
    <main style={{ padding: '4rem', minHeight: '60vh' }}>
      <TextContainer 
        textSections={textBody1}
      >
        <Gallery />
      </TextContainer>
    </main>
  );
}

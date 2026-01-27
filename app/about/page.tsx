import ButtonContainer from "@/components/ButtonContainer";
import TextContainer from "@/components/TextContainer";


export default function AboutPage() {
    const text = [{
            title: "About Me",
            content: [
                "Born and raised in Santa Fe, New Mexico, I was born into a mixed-race Mexican-American family. Santa Fe served as a place for me to both lean into my own Mexican heritage, but also be exposed to a variety of other cultures and perspectives due to its rich history and diverse population. Surrounded by family, I developed a strong sense of community and cultural pride from an early age, and looked to build that wherever I went. I attended Catholic school through high school, attending St. Michael's High School (a school older than the state of New Mexico itself!). I was also heavily involved in the artistic community in Santa Fe through a children's theater group called Pandemonium Productions, where I performed in over a dozen plays and musicals, and developed a love for performance and storytelling. I also sang in the choir and performed in the marimba band at the St. Francis Cathedral Basilica, which facilitated a diverse love for all types of music.",
                "I left Santa Fe in 2015 to attend college at Gonzaga University on a music scholarship for voice. This scholarship allowed me to explore my passion for music and performance while also pursuing a degree in a more STEM focused field. I was also able to live in a beautiful new place where I was constantly dumbfounded by the natural beauty and abundance of water and life in the Pacific Northwest. I was able to meet so many new people and broaden my understanding of the world and it's people. I received a very grounded Liberal Arts education at Gonzaga, which allowed me to explore a variety of subjects and disciplines, ultimately leading me to double major in Mathematics and Computer Science. Unfortunately, when COVID hit in 2020, I made the decision to step away from school and work to support myself to allow my brother to finish his degree.",
                "I moved back to Santa Fe in 2021 after spending the bulk of 2020 selling suits at Men's Wearhouse in Spokane, WA and living on my brother's couch. I moved back to Santa Fe when I got a call from the New Mexico State Senate to work as the assistant IT Manager for the chamber. It was a challenging and rewarding experience, as I was able to learn a lot about networking, systems administration, and IT management in a fast-paced and high-pressure environment. I was also able to work closely with the legislators and staff of the New Mexico State Senate, which gave me a unique perspective on the political process and the importance of technology in government. I contiuned to work as a contractor for the state until the end of 2021, providing support and project management for a new budget management system for the entire state government.",
                "I then took a job with a contracting group called FDM who trained me and sent me to work as a full stack Android Developer for TD Bank on their Payments Pod. I participated in a wide variety of projects over my roughly 3 years there, from building new features for the TD mobile banking app, to building internal tools for the Payments team to manage their microservices and cloud infrastructure. I learned a lot about software development, agile methodologies, and working in a large corporate environment.",
                "After being layed off at the end of 2024, I decided to take some time while I job hunted and figured out my next move to try working in a field that is much more outdoors focused. I took a job as a full time ski instructor. While doing this, I discovered a deep-seeded passion for outdoor activities and the natural world and discovered how much my body needed a more outdoors-centric lifestyle. After taking my time as a ski-bum, I took a job as an application developer for the New Mexico Department of Health, where I currently work building internal tools to help manage public health data and initiatives across the state of New Mexico along with building out and redesigning many public facing web applications such as the NMHealth public website.",
                "I have always been a very curious person who didn't want to be bound to a single field of interest. This curiosity has driven me to explore various domains, from theater and music to Mathematics and Computer Science. I like to think of myself as less of a specialized software engineer or outdoorsman of any kind, but as a well-rounded individual who is always looking to learn more and expand my horizons in all aspects of life. I love to meet people and communicate and look to leverage this skill as I continue to grow in my career and personal life. My ultimate goal is to find a way to combine my love for technology and the outdoors in a way that allows me to make a positive impact on the world around me.",
            ],
}];
    return (
        <main style={{ padding: '4rem', minHeight: '60vh' }}>
            <TextContainer textSections={text}>
                {<ButtonContainer
                    title="Learn More"
                    buttons={[
                        ["Tech", "/tech"],
                        ["Performance", "/performance"],
                        ["Outdoors", "/outdoors"],
                    ]}
                    className="mt-6"
                />}
            </TextContainer>
        </main>
    );
}

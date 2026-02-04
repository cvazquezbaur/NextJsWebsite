import TextContainer from "@/components/TextContainer";

export default function OutdoorsPage() {
  const textBody1 = [{
    title: "Outdoor Adventures",
    content: [
      "Growin up in Santa Fe, New Mexico, I was fortunate to be surrounded by stunning natural landscapes that sparked my love for outdoor adventures. As a child, I used to just run around outside in the open spaces of La Tierra, chasing lizards, exploring arroyos, shooting birds and rabbits with my pellet gun, and admiring how erosion and weather shaped the world around me. While I had not yet gotten the bug for serious outdoor activities like hiking and camping, I was always drawn to being outside and experiencing nature firsthand, and at marveling at the beauty and complexity of the natural world.",
      "As I grew older, I began to develop a deeper appreciation for outdoor activities like hiking, camping, hunting, fishing, and backpacking. I started by learning to ski at Ski Santa Fe, skipping school on Fridays to go fish with friends out in the Pecos Wilderness (although I was never succesful), visiting friends cabins in the mountains for weekend camping trips, going out to Abiqiu lake to swim, riding horses out in the Galisteo Basin, and eventually going on a hunting trip out by Mora with my step father to get an elk. While I wouldn't have called myself much of an outdoorsman at the time, these experiences planted the seeds for a lifelong love of outdoor adventures.",
      "Going to college in Spokane, Washington opened me up to a whole new level of outdoors appreciation. Being such an outdoorsy student population at Gonzaga University, I was exposed to hiking, camping, and backpacking trips in the nearby forests and mountains of Eastern Washington, Northern Idaho, and Western Montana. I would ski out at Mt. Spokane and Schweitzer, go hiking and swimming in the bowl and pitcher recreational area, take weekend trips to Nelson, British Columbia, and eventually went backpacking in the Lolo National Forest in Montana. These experiences left even more connected to the outdoors and with a deep desire to become a more competent and active outdoorsman.",
      "Since returning to Santa Fe after college, I have made a concerted effort to continue exploring and enjoying the outdoors. I have gone on numerous hiking and camping trips in the nearby national forests and wilderness areas, including the Pecos Wilderness, Santa Barbara Wilderness, Santa Fe National Forest, and San Juan National Forest. In the winter of 2024-2025, I worked as full time ski instructor at Ski Santa Fe, which allowed me to spend even more time in the mountains, develop my skiing skills, and grow my passion for equitable outdoor access and environmental stewardship. In that vein, I have also become involved with local organizations that promote outdoor education and conservation, such as the Santa Fe Conservation Trust and the New Mexico Wilderness Alliance as a wilderness defender along with having spent a year volunteering with the Santa Fe County Fire Department as a vehicle operator and wildland firefighter.",
      "Overall, my love for outdoor adventures has been a constant thread throughout my life, shaping my values, interests, and sense of self. I am grateful for the opportunities I have had to explore and appreciate the natural world, and I look forward to continuing to do so for many years to come.",
    ],
  }];
  return (
    <main style={{ padding: '4rem', minHeight: '60vh' }}>
      <TextContainer textSections={textBody1}>
        <p>Gallery of images and outdoor resources I promote will be added here</p>
      </TextContainer>
    </main>
  );
}

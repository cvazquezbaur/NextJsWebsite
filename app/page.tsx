import type { Metadata } from "next";
import ButtonContainer from '../components/ButtonContainer';
import Hero from '../components/Hero';

export const metadata: Metadata = {
  title: "Home",
  description:
    "Explore the portfolio of Carlos Vazquez Baur across tech, performance, and outdoor projects.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <Hero>
        <ButtonContainer
          className="mt-6"
          buttons={[
            ['View My Tech Work', '/tech'],
            ['See My Performances', '/performance'],
            ['Explore My Outdoor Adventures', '/outdoors'],
          ]}
        />
      </Hero>
    </>
  );
}

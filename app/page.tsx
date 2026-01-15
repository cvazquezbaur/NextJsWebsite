import ButtonContainer from '../components/ButtonContainer';
import Hero from '../components/Hero';

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

import Biography from "../Components/Biography";
import Hero from "../Components/Hero";
function AboutUs() {
  return (
    <>
      <Hero
        title={"Learn More About Us | ZeeCare Medical Institute"}
        imageUrl={"/contact.png"}
      />
      <Biography />
    </>
  );
}

export default AboutUs;

import Biography from "../Components/Biography";
import Hero from "../Components/Hero";
import MessageForm from "../Components/MessageForm";
import Departments from "../Components/departments";

function Welcome() {
  return (
    <>
      <Hero
        title={
          "Welcome to ZeeCare Medical Institute | Your Trusted Healthcare Provider"
        }
        imageUrl={"/hero.png"}
      />
      <Biography />
      <Departments />
      <MessageForm />
    </>
  );
}

export default Welcome;

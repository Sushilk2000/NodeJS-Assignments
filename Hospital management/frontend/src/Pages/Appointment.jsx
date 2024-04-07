import AppointmentForm from "../Components/AppointmentForm";
import Hero from "../Components/Hero";

function Appointment() {
  return (
    <>
      <Hero
        title={"Schedule Your Appointment | ZeeCare Medical Institute"}
        imageUrl={"/signin.png"}
      />
      <AppointmentForm />
    </>
  );
}

export default Appointment;

import AppointmentForm from "../Components/AppointmentForm";
import Hero from "../Components/Hero";

function Appointment({ isAuthenticated, user }) {
  return (
    <>
      <Hero
        title={"Schedule Your Appointment | ZeeCare Medical Institute"}
        imageUrl={"/signin.png"}
      />
      <AppointmentForm isAuthenticated={isAuthenticated} user={user} />
    </>
  );
}

export default Appointment;

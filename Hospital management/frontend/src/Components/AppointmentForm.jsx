import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
function AppointmentForm({ isAuthenticated, user }) {
  const [appointmentDate, setappointmentDate] = useState();
  const [department, setDepartment] = useState("Pediatrics");
  const [doctor, setDoctor] = useState("");
  const departmentArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Radiology",
  ];
  const [doctors, setDoctors] = useState();
  useEffect(() => {
    const fetchDoctors = async () => {
      const response = await fetch(
        "https://hospital-management-q6tl.onrender.com/api/v1/user/getdoctors"
      );
      const data = await response.json();
      setDoctors(data.doctors);
      console.log(data.doctors);
    };
    fetchDoctors();
  }, []);
  async function handleAppointment(e) {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("Please login first");
      return;
    }
    try {
      const appointment = {
        user: user._id,
        dateOfAppointment: appointmentDate,
        department: department,
        doctor: doctor,
      };
      console.log(appointment);
      const response = await fetch(
        "https://hospital-management-q6tl.onrender.com/api/v1/appointments/createAppointment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(appointment),
        }
      );
      const data = await response.json();
      toast.success("appointment created successfully");
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  }
  return (
    <>
      <div className="container form-component register-form">
        <h2>Appointment Form</h2>
        <p>Please fill the form</p>
        <form onSubmit={handleAppointment}>
          <div>
            <select
              name="department"
              id="department"
              onChange={(e) => {
                setDepartment(e.target.value);
                console.log(e.target.value);
              }}
            >
              {departmentArray.map((department, index) => (
                <option value={department} key={index}>
                  {department}
                </option>
              ))}
            </select>
            <select
              name="doctor"
              id="doctor"
              required
              onChange={(e) => {
                setDoctor(e.target.value);
              }}
            >
              <option value="">Select Doctor</option>
              {doctors &&
                doctors
                  .filter((doctor) => doctor.department === department)
                  .map((doctor, index) => {
                    return (
                      <option value={doctor._id} key={index}>
                        {doctor.firstName + " " + doctor.lastName}
                      </option>
                    );
                  })}
            </select>
          </div>
          <div>
            <input
              type="date"
              name="appointmnetDate"
              id="appointmnetDate"
              required
              value={appointmentDate}
              onChange={(e) => setappointmentDate(e.target.value)}
            />
          </div>
          <button type="submit">GET APPOINTMENT</button>
        </form>
      </div>
    </>
  );
}

export default AppointmentForm;

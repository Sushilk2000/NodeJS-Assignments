import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
function Departments() {
  const departmentsArray = [
    {
      name: "Pediatrics",
      imageUrl: "/departments/pedia.jpg",
    },
    {
      name: "Orthopedics",
      imageUrl: "/departments/ortho.jpg",
    },
    {
      name: "Cardiology",
      imageUrl: "/departments/cardio.jpg",
    },
    {
      name: "Neurology",
      imageUrl: "/departments/neuro.jpg",
    },
    {
      name: "Oncology",
      imageUrl: "/departments/onco.jpg",
    },
    {
      name: "Radiology",
      imageUrl: "/departments/radio.jpg",
    },
    {
      name: "Physical Therapy",
      imageUrl: "/departments/therapy.jpg",
    },
    {
      name: "Dermatology",
      imageUrl: "/departments/derma.jpg",
    },
    {
      name: "ENT",
      imageUrl: "/departments/ent.jpg",
    },
  ];
  const responsive = {
    superLargeDesktop: {
      breakpoint: {
        max: 4000,
        min: 3000,
      },
      items: 5,
      slidesToSlide: 1,
    },
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1024,
      },
      items: 3,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: {
        max: 1024,
        min: 464,
      },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: {
        max: 464,
        min: 0,
      },
      items: 1,
      slidesToSlide: 1,
    },
  };
  return (
    <div className="container departments">
      <h2>Departments</h2>
      <Carousel
        responsive={responsive}
        removeArrowOnDeviceType={["tablet", "mobile"]}
      >
        {departmentsArray.map((department, index) => (
          <div className="card" key={index}>
            <div className="depart-name">{department.name}</div>
            <img src={department.imageUrl} alt={department.name} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default Departments;

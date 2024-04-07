import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Messages({ isAuthenticated }) {
  const [messages, setMessages] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          "http://localhost:10000/api/v1/message/getmessages",
          { withCredentials: true }
        );
        const data = await response.json();
        setMessages(data.messages);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch messages.");
      }
    };

    if (isAuthenticated) {
      fetchMessages();
    } else {
      nav("/login");
    }
  }, [isAuthenticated, nav]);

  return (
    <div className="page messages">
      <h1>MESSAGES</h1>
      <div className="banner">
        {messages && messages.length > 0 ? (
          messages.map((ele, index) => (
            <div key={index} className="card">
              <div className="details">
                <p>
                  First Name: <span>{ele.firstName}</span>
                </p>
                <p>
                  Last Name: <span>{ele.lastName}</span>
                </p>
                <p>
                  Email: <span>{ele.email}</span>
                </p>
                <p>
                  Phone: <span>{ele.phone}</span>
                </p>
                <p>
                  message: <span>{ele.message}</span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <h1>NO MESSAGES </h1>
        )}
      </div>
    </div>
  );
}

export default Messages;

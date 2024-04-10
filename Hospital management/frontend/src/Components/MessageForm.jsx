import { useRef } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";
function MessageForm() {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [message, setMessage] = useState();

  const handleMessage = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://hospital-management-q6tl.onrender.com/api/v1/message/createmessage",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            message: message,
          }),
        }
      );
      const data = await response.json();
      toast.success("Message sent successfully");
    } catch (error) {
      toast.error("Error while sending message");
      console.error(error);
    }
  };

  return (
    <div className="container form-component message-form">
      <h2>Send Us A Message</h2>
      <form onSubmit={handleMessage}>
        <div>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="number"
            placeholder="Phone"
            value={[phone]}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <textarea
          name="message"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows="7"
        ></textarea>
        <button type="submit" onClick={handleMessage}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default MessageForm;

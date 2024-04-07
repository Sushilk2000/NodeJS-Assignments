import { useRef } from "react";
import { toast } from "react-toastify";
import axios from "axios";
function MessageForm() {
  const firstName = useRef("");
  const lastName = useRef("");
  const email = useRef("");
  const phone = useRef("");
  const message = useRef("");

  const handleMessage = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "http://localhost:10000/api/v1/messages/",
          {
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            email: email.current.value,
            phone: phone.current.value,
            message: message.current.value,
          },
          {
            withCredentials: true,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res);
          toast.success(res.data.message);
        });
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="container form-component message-form">
      <h2>Send Us A Message</h2>
      <form onSubmit={handleMessage}>
        <div>
          <input type="text" placeholder="First Name" ref={firstName} />
          <input type="text" placeholder="Last Name" ref={lastName} />
        </div>
        <div>
          <input type="text" placeholder="Email" ref={email} />
          <input type="number" placeholder="Phone" ref={phone} />
        </div>
        <textarea
          name="message"
          placeholder="Message"
          ref={message}
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

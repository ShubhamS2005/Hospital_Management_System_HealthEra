import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const MessageForm = () => {
  const [firstname, setFirstName] = useState("");

  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleMessage = async (e) => {
    e.preventDefault();
    try {
      await axios
      .post(
        "http://localhost:8000/api/v1/message/send",
        {firstname,lastname,email,phone,message},
        {
          withCredentials:true,
          headers:{ "Content-Type": "application/json"},
        })
        .then((res)=>{
          toast.success(res.data.message);
          setFirstname("");
          setLastname("");
          setEmail("");
          setMessage("");
          setPhone("");
        });
    } catch (error) {
      toast.error(error.response.data.message)
    }
  };

  return (
    <>
      <div className=" message-container">
        <h3>Send Us A Message</h3>
        <form onSubmit={handleMessage}>
          <div>
            <input
              type="text"
              placeholder="First Name"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastname}
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
              type="text"
              placeholder="Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <textarea
            rows={10}
            cols={50}
            placeholder="Message"
            value={message}
            onChange={(e)=>setMessage(e.target.value)}
          />
            <button type="submit" className="Submit">Send</button>
        </form>
      </div>
    </>
  );
};

export default MessageForm;

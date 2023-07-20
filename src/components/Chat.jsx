import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import Swal from 'sweetalert2'
import useAuth from "../hooks/useAuth";
import api from "../api";



const Chat = () => {
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState({});
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");
  const Navigate = useNavigate();
  const { token, user } = useAuth();

  useEffect(() => {
    api
      .get(`tickets/${ticketId}/messages`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((data) => {
        setMessages(data?.data);
      })
      .catch((err) => console.log("err : ", err));

    api
      .get(`tickets/${ticketId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((data) => {
        setTicket(data?.data);
      })
      .catch((err) => console.log("err : ", err));
  }, []);

  const sendMessage = async () => {
    try {
      const response = await api.post(
        "messages",
        {
          ticket_id: ticketId,
          body: msg,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.status === 201) {
        setMessages([
          ...messages,
          {
            id: Math.floor(Math.random() * Date.now()),
            support_id: Math.floor(Math.random() * Date.now()), // it will get from context later
            body: msg,
          },
        ]);
        setMsg("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const acceptTicket = async () => {
    try {
      const response = await api.patch(
        `tickets/${ticketId}/accept`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.status) {
        setTicket({ ...ticket, support_id: user.id });
      }
    } catch (err) {
      console.log("errr : ", err);
    }
  };
  const resolved = async () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3FC2EE',
      cancelButtonColor: '#F3969A',
      confirmButtonText: 'Yes'
    }).then(async result => {
      if (result.isConfirmed) {
        const response = await axios.patch(`http://127.0.0.1:8000/api/tickets/${ticketId}/resolved`, {}, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        if(response.status === 200) {
          setTicket({...ticket, status: 1})
        }
      }
    })

    // console.log(response)
  }
  const deleteTicket = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#F8BB86',
      cancelButtonColor: '#F3969A',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await api.delete('tickets/' + ticketId, {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        })
        if(response.status === 200) Navigate('/tickets')
      }
    })

  }
  return (
    <section className="my-2">
      <div className="d-flex justify-content-betweens">
        <button className="btn btn-primary mb-2" onClick={() => Navigate(-1)}>
          <IoIosArrowBack />
        </button>
      </div>
      <div className="bg-dark">
        <div className="pt-3 rounded-2 text-light chat d-flex flex-column justify-content-end">
          {messages.map((message) => {
            if (message.hasOwnProperty("user_id")) {
              return (
                <div
                  className="d-flex align-items-start mb-1 ms-2"
                  key={message.id}
                >
                  <img
                    src="https://xsgames.co/randomusers/avatar.php?g=male"
                    alt=""
                    className="user-avatar me-2 align-self-end"
                  />
                  <div className="d-flex flex-column align-items-start w-75">
                    <span className="border p-1 px-2 rounded-3 mb-1">
                      {message.body}
                    </span>
                  </div>
                </div>
              );
            } else {
              return (
                <div
                  className="d-flex justify-content-end mb-1 me-2"
                  key={message.id}
                >
                  <div className="d-flex flex-column align-items-end w-75">
                    <span className="border p-1 px-2 rounded-3 mb-1">
                      {message.body}
                    </span>
                  </div>
                </div>
              );
            }
          })}
          {!ticket?.support_id && (
            <div className="d-flex justify-content-center mb-3">
              <button
                className="btn btn-sm btn-light"
                onClick={acceptTicket}
              >
                Accept this ticket
              </button>
            </div>
          )}
        </div>
        {(ticket?.support_id && !ticket?.status) && (
          <input
            type="text"
            className="form-control rounded-0"
            value={msg}
            placeholder="Message..."
            onChange={(e) => setMsg(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
        )}
      </div>
      {(ticket?.support_id && !ticket?.status) && 
      <div className="mt-2 d-flex justify-content-end">
        <button className="btn btn-primary btn-sm mb-2 me-2" onClick={resolved}>
              <AiOutlineCheck /> resolved
        </button>
        <button className="btn btn-danger btn-sm mb-2" onClick={deleteTicket}>
              <AiOutlineClose /> delete
        </button>
      </div>}

      {
        ticket?.status ? <small className="text-center d-block mt-2 text-success">Resolved at { ticket?.latest_update }</small> : ''
      }
    </section>
  );
};

export default Chat;

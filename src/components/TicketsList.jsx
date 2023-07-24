import { useState, useEffect } from "react";
import Ticket from "./Ticket";
import Tabs from "./partials/Tabs";
import useAuth from "../hooks/useAuth";
import api from "../api";
import InfiniteScroll from "react-infinite-scroll-component";

const TicketsList = ({ status = null }) => {
  const [tickets, setTickets] = useState([]);
  const [data, setData] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const { token } = useAuth();

  function getTickets() {
    let url = "tickets";
    if (["pending", "resolved"].includes(status)) url += `/${status}`;
    api
      .get(url, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((data) => {
        setTickets(data?.data);
      })
      .catch((err) => {
        console.log("error : ", err);
      });
  }
  const fetchData = () => {
    if(data.length < tickets.length) {
      // console.log(data)
      setData([...data, tickets[data.length]])
    }
    else setHasMore(false)  
  }
  useEffect(() => {
    getTickets();
    // console.log(tickets, data)
  }, [status]);

useEffect(() => {
    setData(tickets.slice(0, 4))
}, [tickets])
  return (
    <>
      <Tabs />
      <InfiniteScroll
        dataLength={data.length} //This is important field to render the next data
        next={fetchData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {data.map((ticket) => (
          <Ticket ticket={ticket} key={ticket.id} />
        ))}
      </InfiniteScroll>
      
      <div>
      </div>
    </>
  );
};

export default TicketsList;

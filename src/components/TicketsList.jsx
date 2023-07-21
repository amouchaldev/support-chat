import { useState, useEffect } from 'react'
import Ticket from './Ticket'
import Tabs from './partials/Tabs'
import useAuth from '../hooks/useAuth'
import api from '../api'

const TicketsList = ({status = null}) => {
    const [tickets, setTickets] = useState([])
  const { token } = useAuth()

    function getTickets() {
        let url = 'tickets'
        if(['pending', 'resolved'].includes(status)) url += `/${status}`
        api.get(url, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      .then(data => {
          setTickets(data?.data)
      })
      .catch(err => {
        console.log('error : ', err)
      })
    }
  
    useEffect(() => {
      getTickets()
    }, [status])
  return (
    <>
    <Tabs />
    <div>
         {
          tickets.map(ticket => <Ticket ticket={ticket} key={ticket.id}/>)
        }
    </div>
    </>
  )
}

export default TicketsList
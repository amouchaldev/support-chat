import { Route, Routes } from 'react-router-dom'
import MasterLayout from './components/MasterLayout'
import TicketsList from './components/TicketsList'
import Chat from './components/Chat'
import Login from './components/Login'
import Home from './components/Home'
import NotFound from './components/partials/NotFound'
import { useLocation } from "react-router-dom"

function App() {
  const { pathname } = useLocation()

  return (
      <Routes>
        <Route path="/" element={<MasterLayout />}>
          <Route index element={<Home />} />
            <Route path='tickets'>
              <Route index element={<TicketsList />}/>
              <Route path='pending' element={<TicketsList status='pending'/>}/> 
              <Route path='resolved' element={<TicketsList status='resolved'/>}/> 
              <Route path=':id' element={<TicketsList />}/> 
            </Route>
          <Route path='/messages/:ticketId' element={<Chat />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
  )

}

export default App

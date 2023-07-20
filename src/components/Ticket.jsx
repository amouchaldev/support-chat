import { AiOutlineCheck } from "react-icons/ai"
import {LuMessagesSquare} from "react-icons/lu"
import { Link } from "react-router-dom"

const Ticket = ({ticket: {id, topic, description, unseen_messages_count, support_id, status}}) => {
  return (
    <Link to={'/messages/' + id} className="card mb-3 text-decoration-none ticket-card">
        <div className="card-body">
            <h5 className="card-title">{topic}</h5>
            <p className="card-text">{description}</p>
            {(!status && support_id) && <span className="badge bg-secondary py-1 me-1">pending</span> }
            {!support_id && <span className="badge bg-primary py-1 me-1">new</span> }
            {status ? <span className="badge bg-primary py-1 me-1"><AiOutlineCheck /></span> : ''}
            {!status && <span className="badge bg-info">
              <small> 
              {+unseen_messages_count > 9 ? '+9' : unseen_messages_count }
              </small> <LuMessagesSquare />
            </span> }
        </div>
    </Link>
  )
}

export default Ticket
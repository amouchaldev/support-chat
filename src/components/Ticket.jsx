import { AiOutlineCheck } from "react-icons/ai"
import {LuMessagesSquare} from "react-icons/lu"
import { Link } from "react-router-dom"

const Ticket = ({ticket: {id, topic, description, unseen_messages_count, support_id, status, latest_message, user}}) => {
  return (
    <Link to={'/messages/' + id} className="card mb-3 text-decoration-none ticket-card" user="llallala">
      <div className="card-header">
        <h6 className="m-0">{user?.first_name + ' ' + user?.last_name}</h6>
      </div>
        <div className="card-body">
            <h5 className="card-title">{topic}</h5>
            <p className="card-text">{latest_message ? latest_message : description}</p>
        </div>
        <div className="card-footer">
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
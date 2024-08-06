// Write your code here
import './index.css'
import {Link} from 'react-router-dom'
import {Component} from 'react'

class TeamCard extends Component {
  render() {
    const {teamUpdate} = this.props
    const {id, name, teamImageUrl} = teamUpdate
    return (
      <Link to={`/team-matches/${id}`} className="item-link">
        <li>
          <div>
            <img src={teamImageUrl} alt={`${name}`} />
          </div>
          <div>
            <p>{name}</p>
          </div>
        </li>
      </Link>
    )
  }
}
export default TeamCard

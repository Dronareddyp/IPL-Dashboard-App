// Write your code here
import {Component} from 'react'
// import {Link} from 'react-router-dom'
import TeamCard from '../TeamCard'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class Home extends Component {
  state = {
    teamCardList: [],
    isTrue: true,
  }

  componentDidMount() {
    this.getTeamCardObj()
  }

  getTeamCardObj = async () => {
    const res = await fetch('https://apis.ccbp.in/ipl')
    const data = await res.json()
    const updateData = data.teams.map(demo => ({
      id: demo.id,
      name: demo.name,
      teamImageUrl: demo.team_image_url,
    }))

    this.setState({teamCardList: updateData, isTrue: false})
  }
  render() {
    const {teamCardList, isTrue} = this.state
    return (
      <div className="homeApp">
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
          />
          <h1>IPL Dashboard</h1>
        </div>
        {isTrue ? (
          <div testid="loader">
            <Loader type="Rings" color="#00BFFF" height={50} width={50} />
          </div>
        ) : (
          <ul>
            {teamCardList.map(demo => (
              <TeamCard key={demo.id} teamUpdate={demo} />
            ))}
          </ul>
        )}
      </div>
    )
  }
}
export default Home

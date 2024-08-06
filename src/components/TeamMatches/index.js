// Write your code here
import {Component} from 'react'
import './index.css'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class TeamMatches extends Component {
  state = {
    teamMatchUpdate: [],
    isTrue: true,
  }

  componentDidMount() {
    this.getDetailsUpdate()
  }
  getDetailsUpdate = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const res = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await res.json()
    const updateData = {
      teamBannerUrl: data.team_banner_url,
      latestMatchDetails: {
        id: data.latest_match_details.id,
        umpires: data.latest_match_details.umpires,
        result: data.latest_match_details.result,
        manOfTheMatch: data.latest_match_details.man_of_the_match,
        date: data.latest_match_details.date,
        venue: data.latest_match_details.venue,
        competingTeam: data.latest_match_details.competing_team,
        competingTeamLogo: data.latest_match_details.competing_team_logo,
        firstInnings: data.latest_match_details.first_innings,
        secondInnings: data.latest_match_details.second_innings,
        matchStatus: data.latest_match_details.match_status,
      },
      recentMatches: data.recent_matches.map(demo => ({
        umpires: demo.umpires,
        result: demo.result,
        manOfTheMatch: demo.man_of_the_match,
        id: demo.id,
        date: demo.date,
        venue: demo.venue,
        competingTeam: demo.competing_team,
        competingTeamLogo: demo.competing_team_logo,
        firstInnings: demo.first_innings,
        secondInnings: demo.second_innings,
        matchStatus: demo.match_status,
      })),
    }
    this.setState({
      teamMatchUpdate: updateData,
      isTrue: false,
    })
  }

  render() {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const {teamMatchUpdate, isTrue} = this.state
    const {latestMatchDetails, teamBannerUrl, recentMatches} = teamMatchUpdate
    return (
      <div className={`app-team-matches-container ${id}`}>
        {isTrue ? (
          <div testid="loader">
            <Loader
              type="BallTriangle"
              color="#00BFFF"
              height={80}
              width={80}
            />
          </div>
        ) : (
          <div>
            <img src={teamBannerUrl} alt="team banner" />
            <LatestMatch latestMatch={latestMatchDetails} />
            <ul>
              {recentMatches.map(demo => (
                <MatchCard matchData={demo} key={demo.id} />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}
export default TeamMatches

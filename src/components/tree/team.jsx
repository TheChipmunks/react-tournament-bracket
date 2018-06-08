import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {
  TeamUI,
  TeamName,
  TeamScore,
  Flag,
  TeamPlace,
  SmallTeamLogo,
  MapScore,
  MapScoreWrap
} from '../../ui'

const places = ({isBronzeGame, isLast, winner, score, isGeneral, double, final}) => {
  if (double && !final && isGeneral) {
    return null
  } else if (isLast && typeof(score) === "number" && !isGeneral) {
   return  winner ? null : '3'
  } else if (!double && isLast && typeof(score) === "number") {
    return winner ? '1' : '2'
  } else if (double && final && isLast && typeof(score) === "number") {
    return winner ? '1' : '2'
  }
  return null
}

export class Team extends Component {

  shouldComponentUpdate = ({ hoverTeam, isHoverGame }) => {
    if (
      hoverTeam == this.props.team.id ||
      (this.props.hoverTeam == this.props.team.id && this.props.hoverTeam != hoverTeam) ||
      isHoverGame !== this.props.isHoverGame) {
      return true
    } else {
      return false
    }
  }

  render() {
    const { team, setHoverClass, isLast, hoverTeam, def, winner, isHoverGame, allMr, howTeam, isBronzeGame, isGeneral, double, final  } = this.props
    const { id, name, score, flag, logo, mR } = team

    const place = places({isBronzeGame, isLast, winner, score, isGeneral, double, final})
    return (
      <TeamUI
        active={hoverTeam.toString() == id.toString()}
        lose={!winner}
        primaryColor={def.primaryColor}
        className={`team ${id} ${winner ? 'team-winner' : 'team-loser'}`}
        onMouseOver={() => setHoverClass(id)}
        onMouseLeave={() => setHoverClass('')}>
        <TeamName>
          <Flag flagname={flag} />
          {logo && <SmallTeamLogo src={`/uploads/teams/150x150/${logo}`} />}
          {name}
        </TeamName>
        <TeamScore
          active={hoverTeam == id}
          lose={!winner}
          primaryColor={def.primaryColor} >{score ? score : score == '0' ? '0' : `--`}</TeamScore>
        {!isHoverGame && place &&
          <TeamPlace place={place} />}
        {isHoverGame && 
          <MapScoreWrap scoreLength={mR.length}>
            {allMr.length ? mR.map( (score, index) => (
              <MapScore
                key={index}
                howTeam={howTeam} 
                winner={allMr[index]}>
                {score}
              </MapScore>
            ) ) : null}
          </MapScoreWrap>
        }
      </TeamUI>
    )
  }
}
Team.propTypes = {
  def: PropTypes.object,
  team: PropTypes.object,
  hoverTeam: PropTypes.string,
  isFinal: PropTypes.bool,
  winner: PropTypes.bool,
  setHoverClass: PropTypes.func
}
export default Team

export const EmptyTeam = ({ isBronzeGame }) => (
  <TeamUI isBronzeGame={isBronzeGame} className={`team miss`}>
    <TeamName>TBD</TeamName>
    <TeamScore>--</TeamScore>
  </TeamUI>
)

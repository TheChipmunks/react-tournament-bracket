import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {
  TeamUI,
  TeamName,
  TeamScore,
  TeamPlace,
  SmallTeamLogo,
  MapScore,
  MapScoreWrap
} from '../../ui'

export class Team extends Component {
  static propTypes = {
    
  }

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
    const { team, setHoverClass, hoverTeam, def, winner, isHoverGame } = this.props
    const { id, name, score, flag, place, logo, mR } = team
    console.log(mR, mR.length);
    return (
      <TeamUI
      active={hoverTeam.toString() == id.toString()}
        lose={!winner}
        primaryColor={def.primaryColor}
        className={`team ${id} ${winner ? 'team-winner' : 'team-loser'}`}
        onMouseOver={() => setHoverClass(id)}
        onMouseLeave={() => setHoverClass('')}>
        <TeamScore
          active={hoverTeam == id}
          lose={!winner}
          primaryColor={def.primaryColor} >{score || `--`}</TeamScore>
          {place && <TeamPlace place={place} />}
        <TeamName>
          {logo && <SmallTeamLogo src={`/uploads/teams/150x150/${logo}`} />}
          {name}
        </TeamName>
        {isHoverGame && 
          <MapScoreWrap scoreLength={mR.length}>
            {mR.map( (score, index) => (
              <MapScore key={index} paired={winner} count={index}>{score}</MapScore>
            ) )}
          </MapScoreWrap>
        }
      </TeamUI>
    )
  }
}

export default Team

export const EmptyTeam = () => (
  <TeamUI className={`team miss`}>
        <TeamScore>0</TeamScore>
        <TeamName>Empty</TeamName>
      </TeamUI>
)

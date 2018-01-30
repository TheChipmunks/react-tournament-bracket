import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {
  TeamUI,
  TeamName,
  TeamScore
} from '../../ui'

export class Team extends Component {
  static propTypes = {
    
  }

  shouldComponentUpdate = ({hoverTeam}) => {
    if (
      hoverTeam === this.props.team.name ||
      (this.props.hoverTeam === this.props.team.name && this.props.hoverTeam !== hoverTeam)) {
        return true
      } else {
        return false
      }
  }

  render() {
    const { team, setHoverClass, hoverTeam, def, winner } = this.props
    const { seed, name, score } = team
    return (
      <TeamUI
        active={hoverTeam === team.name}
        lose={!winner}
        primaryColor={def.primaryColor}
        className={`team ${team.name} ${winner ? 'team-winner' : 'team-loser'}`}
        onMouseEnter={() => setHoverClass(team.name)}
        onMouseLeave={() => setHoverClass('')}>
        <TeamScore >{score}</TeamScore>
        <TeamName>{name}</TeamName>
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

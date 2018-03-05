import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { GameUI } from '../../ui'
import Team, { EmptyTeam } from './team'
export class Game extends PureComponent {
  state = {
    isHoverGame: false
  }

  isWinner = (team1, team2) => {
    return +team1 > +team2 ? true : false
  }

  setHover = () => {
    this.setState({ isHoverGame: true })
  }
  removeHover = () => {
    this.setState({ isHoverGame: false })
  }

  render() {
    const { game, setHoverClass, hoverTeam, def } = this.props
    const { isHoverGame } = this.state
    const { teamWidth } = def
    const { team, enemy_team, show } = game
    return (

      <GameUI className={`game ${!true ? 'hide_game' : ''}`} onMouseOver={this.setHover} onMouseOut={this.removeHover} >
        {team ?
          <Team
            def={def} 
            team={team}
            isHoverGame={isHoverGame}
            hoverTeam={hoverTeam} 
            winner={this.isWinner(team.score, (enemy_team && enemy_team.score) || 0)} setHoverClass={setHoverClass} />
            : <EmptyTeam teamWidth={teamWidth} />}
        {enemy_team ?
          <Team
            def={def}
            team={enemy_team}
            isHoverGame={isHoverGame}
            hoverTeam={hoverTeam}
            winner={this.isWinner(enemy_team.score, (team && team.score) || 0)} setHoverClass={setHoverClass} />
            : <EmptyTeam teamWidth={teamWidth} />}
      </GameUI>
    )
  }
}

export default Game

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { GameUI } from '../../ui'
import Team, { EmptyTeam } from './team'
export class Game extends PureComponent {

  isWinner = (team1, team2) => {
    return +team1 > +team2 ? true : false
  }

  render() {
    const { game, setHoverClass, hoverTeam, def } = this.props
    const { team, enemy_team } = game
    return (
        <GameUI className={`game`} >
            {team ? <Team def={def} team={team} hoverTeam={hoverTeam} winner={this.isWinner(team.score, (enemy_team && enemy_team.score) || 0)} setHoverClass={setHoverClass} /> : <EmptyTeam />}
            {enemy_team ? <Team def={def} team={enemy_team} hoverTeam={hoverTeam} winner={this.isWinner(enemy_team.score, (team && team.score) || 0)} setHoverClass={setHoverClass}/> : <EmptyTeam />}
        </GameUI>
    )
  }
}

export default Game

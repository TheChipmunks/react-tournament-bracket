import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  RoundUI,
  RoundTitle
} from '../../ui'
import Game from './game'
export class Round extends Component {

  render() {
    const { round, setHoverClass, roundHeight, hoverTeam, def, count, isLast } = this.props
    return (
      <RoundUI isHide={false} roundHeight={roundHeight} className="round">
      <RoundTitle key={`round_title_${count}`}>{isLast ? 'Final' : `Round ${count + 1}`}</RoundTitle>
        {round.map((game, index) => (
          <Game game={game} key={index} def={def} hoverTeam={hoverTeam} setHoverClass={setHoverClass} />
        )
        )}
      </RoundUI>
    )
  }
}

export default Round

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    RoundUI,
} from '../../ui'
import Game from './game'
export class Round extends Component {
  static propTypes = {
    round: PropTypes.array
  }

  componentWillReceiveProps = ({ hoverTeam }) => {
    if (hoverTeam !== this.props.hoverTeam) {
      this.props.drawRoad()
    }
  }

  render() {
    const { round, setHoverClass, roundHeight, drawRoad, hoverTeam, def } = this.props
    return (
            <RoundUI roundHeight={roundHeight} className="round">
                {round.map( ( game, index ) => (
                    <Game game={game} key={index} def={def} hoverTeam={hoverTeam} setHoverClass={setHoverClass} /> 
                    )
                )}
            </RoundUI>
    )
  }
}

export default Round

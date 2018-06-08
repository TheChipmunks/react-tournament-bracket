import PropTypes from "prop-types";
import React, { Component } from "react";
import {
	RoundTitle,
	RoundUI
} from "../../ui";
import Game from "./game";
export class Round extends Component {
	static propTypes = {
		round: PropTypes.array
	};

	state = {
		roundHeight: null
	};

	componentDidMount = () => {
		const h = this.round.parentNode.offsetHeight;
		this.setState({ roundHeight: h });
	};

	/**
	 * Get title for each round according to his number in bracket
	 */
	roundName = () => {
		const { count, totalRounds, isLast, t, isGeneral } = this.props;
		let round = count + 1;
		let name = null;
		let diff = totalRounds - round;
		if (isGeneral) {
			if (diff < 3) {
				name = diff
			} else {
				name = `Round ${round}`;
			}
		} else {
			name = isLast ? `Losers Final` : `Losers' Round ${round}`;
		}

		return name;
	};

	render() {
		const {
			round,
			setHoverClass,
			hoverTeam,
			def,
			isLast,
			isGeneral,
			final,
			double
		} = this.props;
		const { roundHeight } = this.state;
		return (
			<RoundUI
				isHide={false}
				innerRef={round => (this.round = round)}
				roundHeight={roundHeight + 31}
				className={`round ${final ? "grandFinal" : ""}`}
			>
				{round && round.length ? (
					<React.Fragment>
						<RoundTitle key={`rt`}>
							{this.roundName()}
						</RoundTitle>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "space-around",
								alignItems: "center",
								height: '100%',
								minHeight: `${roundHeight || 100}px`,
								paddingTop: final ? 150 : 0
							}}
							key={`rg`}
						>
							{round.map((game, index) => (
								<Game
									game={game}
									double={double}
									key={index}
									isGeneral={isGeneral}
									def={def}
									final={final}
									hoverTeam={hoverTeam}
									setHoverClass={setHoverClass}
									isLast={isLast}
								/>
							))}
						</div>
					</React.Fragment>
				) : (
					<RoundTitle />
				)}
			</RoundUI>
		);
	}
}
Round.propTypes = {
	round: PropTypes.array,
	reDraw: PropTypes.func,
	def: PropTypes.object,
	roundHeight: PropTypes.number,
	hoverTeam: PropTypes.string,
	setHoverClass: PropTypes.func
};
export default Round;

import React, { PureComponent } from "react";
import {
	TreeUI,
	CanvasEl,
	ScrollUI,
	DoubleWrapper
} from "../../ui";
import {_const } from '../../ui/const'
import _ from "lodash";
import Round from "./round";
import PropTypes from "prop-types";
import {
	calcCenter,
	calcRight,
	calcLeft,
	lineDistanceFromEnd,
	drawSCurve,
	drawCurve,
	clearCanvas,
	drawLine
} from "./calc";

const defaultOption = {
	width: 3,
	color: "#BBB",
	radius: 15,
	isHideFirstRound: false,
	lineColor: `#bdc3c7`,
	winnerLineColor: `#bdc3c7`,
	lineWeight: 0.5
};

const checkRecursive = (array, className, idx) => {
	const item = array[idx];
	if (!item) return false;
	if (!item.querySelector(className)) checkRecursive(array, className, idx + 1);
	return array[idx];
};

export class DoubleElumination extends PureComponent {
	constructor({ option = {} }) {
		super();
		this.timer = null;
		this.option = { ...defaultOption, ...option };
	}

	state = {
		activeTeam: "",
		hoverTeam: "",
		width: 3,
		color: "#BBB",
		radius: 15,
		treeWidth: 0,
		treeHeight: 0,
		isHideFirstRound: false
	};
	componentDidUpdate = ({ hoverClass }) => {
		if (hoverClass !== this.props.hoverClass) {
			this.drawRoad();
		}
	};
	componentDidMount = () => {
		this.renderTree();
		window.addEventListener("resize", this.resize);
	};

	componentWillUnmount = () => {
		window.removeEventListener("resize", this.resize);
	};

	resize = () => {
		clearTimeout(this.timer);
		this.timer = setTimeout(() => {
			clearCanvas(this.TreeCtx, {
				width: this.state.treeWidth,
				height: this.state.treeHeight
			});
			this.drawTree();
		}, 1000);
	};
	renderTree() {
		try {
			this.init();
		} catch (error) {
			console.log(error);
		}
	}

	// add async
	async init() {
		const makeRun = await (() =>
			//// await to initialize canvas
			this.canvasEl && this.canvasActiveRoad)();
		if (makeRun) {
			// console.log("Wrapper", this.wrapper);

			//// get sizes of tournament tree
			const h = this.wrapper.offsetHeight;
			const w = this.wrapper.scrollWidth;

			const treeOffset = this.canvasEl.getBoundingClientRect().left;

			//// Init canvas element sizes
			const Tree = this.canvasEl;
			const Road = this.canvasActiveRoad;

			//// ser property
			const setPropery = canvas => {
				canvas.width = w * 2;
				canvas.height = h * 2;
				canvas.style.width = `${w}px`;
				canvas.style.height = `${h}px`;
			};
			setPropery(Tree);
			setPropery(Road);
			/// get canvas context
			this.TreeCtx = Tree.getContext("2d");
			this.RoadCtx = Road.getContext("2d");

			//// prepear canvas

			this.TreeCtx.clearRect(0, 0, Tree.width, Tree.height);
			this.TreeCtx.scale(2, 2);

			this.RoadCtx.clearRect(0, 0, Road.width, Road.height);
			this.RoadCtx.scale(2, 2);

			//// set def sizes to state TODO: maybe need to remove
			this.setState({
				treeWidth: w * 2,
				treeHeight: h * 2,
				treeOffset: treeOffset
			});
			this.drawTree();
		}
	}

	drawTree = () => {
		const { rightAlign } = this.props;
		const { treeOffset } = this.state;
		let { primaryColor, lineWeight, radius, lineColor } = this.option;
		const { isHideFirstRound } = this.state;

		if (!lineColor) lineColor = primaryColor;

		const brackets = document.querySelectorAll(`.${_const.theme}_tree`);

		brackets.forEach((bracket, bracketIdx) => {
			if (bracketIdx < 2) {
				const rounds = bracket.getElementsByClassName("round");

				// if (!rounds.length || !Array.isArray(rounds)) return;
				for (let i = 0; i < rounds.length; i++) {
					let isFirstRound = i === 0;
					let thisRound = rounds[i];
					if (!thisRound.querySelector(".game")) continue;
					let allEmptyTeamInRound = thisRound.getElementsByClassName("miss");
					let thisGames = thisRound.getElementsByClassName("game");
					let isGrandFinal = false;

					let count = 1;
					let nextRound = rounds[i + count];
					if (
						isFirstRound &&
						allEmptyTeamInRound.length / 2 === thisGames.length
					) {
						this.setState({ isHideFirstRound: true });
					}

					if (nextRound && !nextRound.querySelector(".game")) {
						count += 1;
						nextRound = rounds[i + count];
					}
					if (i === rounds.length - 1) {
						isGrandFinal = true;
						const firstTreeRounds = document.querySelectorAll(".grandFinal");
						nextRound = firstTreeRounds[firstTreeRounds.length - 1];
					}
					if (!nextRound) return;
					const nextGames = nextRound.getElementsByClassName("game");

					//// isLinear its this_round.length === next_round.length
					const isLinear = thisGames.length === nextGames.length;

					//// cycle of every game in game
					for (let j = 0; j < thisGames.length; j++) {
						let game = thisGames[j];
						let emptyTeam = game.getElementsByClassName("miss");

						//// winner its winnner in this game
						let winner = game.getElementsByClassName("team-winner");
						//// to its where line going ? to next team if they have winner of to next game
						const to = isLinear
							? nextGames[Math.floor(j)]
							: nextGames[Math.floor(j / 2)];
						//// color of line if game have winner
						let color = lineColor
						//// weight of line  if game have winner
						//// where line be started
						//// if rightAlign line started from right
						let startCalcFunc = rightAlign ? calcLeft : calcRight;
						let start = startCalcFunc(
							winner.length ? winner[0] : game,
							treeOffset
						);

						//// if () {}  need to hide game if game not have one or more teams
						if (!game.classList.contains("hide_game")) {
							//// where line end
							let endCalcFunc = rightAlign ? calcRight : calcLeft;
							const toNext = isGrandFinal
								? to.getElementsByClassName("team")[(bracketIdx + 2) % 2]
								: isLinear
									? false
									: to.getElementsByClassName("team")[(j + 2) % 2];
							//// line end on center next game or next team
							const end = endCalcFunc(toNext ? toNext : to, treeOffset);
							//// calc radius
							const radiusAdjust = Math.min(
								radius,
								Math.abs(start.y - end.y) / 2
							);
							//// call func to draw line
							drawSCurve(
								this.TreeCtx,
								start,
								end,
								color,
								lineWeight,
								radius,
								radiusAdjust
							);
						}
					}
				}
			}
		});
	};

	drawRoad = () => {
		const { rightAlign, hoverClass } = this.props;
		const { treeOffset } = this.state;

		if (hoverClass === "") {
			clearCanvas(this.RoadCtx, {
				width: this.state.treeWidth,
				height: this.state.treeHeight
			});
			return;
		}
		let {
			primaryColor,
			lineWeight,
			radius,
			lineColor,
			defaultLineColor
		} = this.option;
		const { isHideFirstRound } = this.state;
		if (!lineColor) lineColor = primaryColor;
		const brackets = document.querySelectorAll(`.${_const.theme}_tree`);

		brackets.forEach((bracket, bracketIdx) => {
			if (bracketIdx < 2) {
				const rounds = bracket.getElementsByClassName("round");
				// if (!rounds.length || !Array.isArray(rounds)) return;
				for (let i = 0; i < rounds.length; i++) {
					let isFirstRound = i === 0;
					let thisRound = rounds[i];
					if (!thisRound.querySelector(".game")) continue;
					let allEmptyTeamInRound = thisRound.getElementsByClassName("miss");
					let thisGames = thisRound.getElementsByClassName("game");
					let nextRound = rounds[i + 1];
					let isGrandFinal = false;
					if (
						isFirstRound &&
						allEmptyTeamInRound.length / 2 === thisGames.length
					) {
						this.setState({ isHideFirstRound: true });
					}
					let count = 1;

					if (nextRound && !nextRound.querySelector(".game")) {
						count += 1;
						nextRound = rounds[i + count];
					}
					if (i === rounds.length - 1) {
						isGrandFinal = true;
						const firstTreeRounds = document.querySelectorAll(".grandFinal");
						nextRound = firstTreeRounds[firstTreeRounds.length - 1];
					}
					if (!nextRound) return;
					const nextGames = nextRound.getElementsByClassName("game");

					//// isLinear its this_round.length === next_round.length
					const isLinear = thisGames.length === nextGames.length;

					//// cycle of every game in game
					for (let j = 0; j < thisGames.length; j++) {
						let game = thisGames[j];
						let emptyTeam = game.getElementsByClassName("miss");

						//// winner its winnner in this game
						let winner = game.getElementsByClassName("team-winner");
						if (
							winner.length &&
							!winner[0].classList.contains(`${hoverClass}`)
						) {
							continue;
						}
						//// to its where line going ? to next team if they have winner of to next game
						const to = isLinear
							? nextGames[Math.floor(j)]
							: nextGames[Math.floor(j / 2)];
						//// color of line if game have winner
						let color;
						//// weight of line  if game have winner
						//// if rightAlign line started from right
						let startCalcFunc = rightAlign ? calcLeft : calcRight;
						let start = startCalcFunc(
							winner.length ? winner[0] : game,
							treeOffset
						);

						let startSelector = winner.length ? winner[0] : game;

						(() => {
							// if (isFirstRound &&  emptyTeam.length) {
							//     return;
							// } else {

							if (
								startSelector.classList.contains(`${this.props.hoverClass}`)
							) {
								color = primaryColor;
							} else {
								return;
							}
							let endCalcFunc = rightAlign ? calcRight : calcLeft;
							const toNext = isGrandFinal
								? to.getElementsByClassName("team")[(bracketIdx + 2) % 2]
								: isLinear
									? false
									: to.getElementsByClassName("team")[(j + 2) % 2];
							//// line end on center next game or next team
							const end = endCalcFunc(toNext ? toNext : to, treeOffset);
							//// calc radius
							const radiusAdjust = Math.min(
								radius,
								Math.abs(start.y - end.y) / 2
							);
							//// call func to draw line
							drawSCurve(
								this.RoadCtx,
								start,
								end,
								color,
								lineWeight,
								radius,
								radiusAdjust
							);
							// }
						})();
					}
				}
			}
		});
	};

	render() {
		const { isHideFirstRound } = this.state;
		const { data, setHoverClass, hoverClass } = this.props;
		if (!data || !data.length) return null;

		// console.log("DOUBLE");

		return (
			<ScrollUI innerRef={wrapper => (this.wrapper = wrapper)}>
				<CanvasEl
					innerRef={canvasEl => (this.canvasEl = canvasEl)}
					key={1}
					id="canvas"
				/>
				<CanvasEl
					innerRef={canvasActiveRoad =>
						(this.canvasActiveRoad = canvasActiveRoad)
					}
					key={3}
				/>
				<DoubleWrapper>
					{data.map(
						(match, matchIdx) =>
							matchIdx < 2 ? (
								<TreeUI key={matchIdx}>
									{match.map((round, roundIdx) => (
										<Round
											round={round}
											isHideFirstRound={isHideFirstRound}
											key={`${matchIdx}_${roundIdx}`}
											count={roundIdx}
											totalRounds={match.length}
											isGeneral={!matchIdx}
											double={true}
											final={false}
											isLast={match.length === roundIdx + 1}
											def={this.option}
											hoverTeam={hoverClass}
											setHoverClass={setHoverClass}
										/>
									))}
								</TreeUI>
							) : null
						// </DoubleRoundWrapper>
					)}
				</DoubleWrapper>
				{data[2] && data[2].length ? (
					<TreeUI key={`grandFinal`}>
						{data[2].map((round, roundIdx) => (
							<Round
								final={true}
								round={round}
								isHideFirstRound={isHideFirstRound}
								key={`round_3`}
								count={roundIdx}
								totalRounds={data[2].length}
								isGeneral={true}
								isLast={true}
								double
								final
								def={this.option}
								hoverTeam={hoverClass}
								setHoverClass={setHoverClass}
							/>
						))}
					</TreeUI>
				) : null}
			</ScrollUI>
		);
	}
}
DoubleElumination.propTypes = {
	data: PropTypes.array,
	option: PropTypes.object
};
export default DoubleElumination;

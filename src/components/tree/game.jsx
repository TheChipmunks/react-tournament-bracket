import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { GameUI } from "../../ui";
import Team, { EmptyTeam } from "./team";
import { Link } from "react-router-dom";

const IsLink = ({ to, isFinish, children }) =>
	to ? (
		<a href={`${to}${isFinish && "/result"}`}>{children}</a>
	) : (
		<React.Fragment>{children}</React.Fragment>
	);

export class Game extends PureComponent {
	state = {
		isHoverGame: false,
		mR: []
	};
	componentWillMount = () => {
		this.allMr = [];
	};

	isWinner = (team1, team2) => {
		return +team1 > +team2 ? true : false;
	};
	setHover = () => {
		this.setState({ isHoverGame: true });
	};
	removeHover = () => {
		this.setState({ isHoverGame: false });
	};

	setMr = (team_mR, enemy_team_mR) => {
		this.allMr = [];
		for (let i = 0; i < team_mR.length; i++) {
			this.allMr.push(
				team_mR[i] > enemy_team_mR[i]
					? "team"
					: team_mR[i] < enemy_team_mR[i]
						? "enemy_team"
						: "draw"
			);
		}
	};

	render() {
		const {
			game,
			setHoverClass,
			hoverTeam,
			def,
			isLast,
			isGeneral,
			double,
			final
		} = this.props;
		const { isHoverGame } = this.state;
		const { team, enemy_team, show, clanwar_id } = game;
		team &&
			team.mR.length &&
			enemy_team &&
			enemy_team.mR.length &&
			this.setMr(team.mR, enemy_team.mR);
		const isBronzeGame = isLast && game.isBronze;
		return (
			<GameUI
				className={`${!isBronzeGame ? "game" : undefined} ${
					!show ? "hide_game" : ""
				}`}
				onMouseOver={this.setHover}
				onMouseOut={this.removeHover}
				isBronzeGame={isBronzeGame}
			>
				<IsLink
					to={clanwar_id ? `/clanwars/${clanwar_id}` : undefined}
					isFinish={enemy_team && typeof enemy_team.score === "number"}
				>
					{team ? (
						<Team
							def={def}
							team={team}
							isHoverGame={isHoverGame}
							hoverTeam={hoverTeam}
							allMr={this.allMr}
							howTeam={"team"}
							winner={this.isWinner(
								team.score,
								(enemy_team && enemy_team.score) || 0
							)}
							setHoverClass={setHoverClass}
							isBronzeGame={isBronzeGame}
							isGeneral={isGeneral}
							isLast={isLast}
							double={double}
							final={final}
							
						/>
					) : (
						<EmptyTeam />
					)}
					{enemy_team ? (
						<Team
							def={def}
							team={enemy_team}
							isHoverGame={isHoverGame}
							howTeam={"enemy_team"}
							allMr={this.allMr}
							hoverTeam={hoverTeam}
							winner={this.isWinner(
								enemy_team.score,
								(team && team.score) || 0
							)}
							setHoverClass={setHoverClass}
							isBronzeGame={isBronzeGame}
							isGeneral={isGeneral}
							isLast={isLast}
							double={double}
							final={final}
							
						/>
					) : (
						<EmptyTeam />
					)}
				</IsLink>
			</GameUI>
		);
	}
}
Game.propTypes = {
	game: PropTypes.object,
	def: PropTypes.object,
	hoverTeam: PropTypes.string,
	setHoverClass: PropTypes.func
};
export default Game;

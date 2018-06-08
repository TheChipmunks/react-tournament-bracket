import React, { Component } from "react";
import { SingleElumination, DoubleElumination } from "./components/tree";
import { CanvasEl } from "./ui";

class Bracket extends Component {
	state = {
		active: ""
	};

	setHoverClass = Active => {
		this.setState({ active: Active.toString() });
	};
	
	render() {
		const { matches } = this.props;
		if (!matches || !matches.length) return null;
		return (
			<React.Fragment>
				<div className="ng_mt_20px">
					{matches.length === 1 ? (
						<SingleElumination
							key={`single_ilumination`}
							isGeneral={true}
							setHoverClass={this.setHoverClass}
							matchLength={matches[0].length}
							hoverClass={this.state.active}
							data={matches[0]}
							def={{
								primaryColor: "#e4144f",
								lineColor: "grey",
								teamWidth: 250,
								radius: 0,
								lineWeight: 3,
								width: 3
							}}
						/>
					) : (
						<DoubleElumination
							setHoverClass={this.setHoverClass}
							hoverClass={this.state.active}
							data={matches}
							option={{
								primaryColor: "#e4144f",
								lineColor: "#bdc3c7",
								winnerLineColor: null,
								teamWidth: 250,
								radius: 0,
								lineWeight: 3,
								isHideFirstRound: false,
								width: 3
							}}
						/>
					)}
				</div>
			</React.Fragment>
		);
	}
}

export default Bracket;

import React, { Component } from 'react';
import Tree from './components/tree';
import { matches } from './localStore/data'
import './App.css'
class App extends Component {

  state = {
    active: ''
  }

  setHoverClass = (Active) => {
    this.setState({ active: Active.toString() })
  }
  
  render() {
    // const { matches } = this.props
    const { active } = this.state
    return (
    
      <div className="col-lg-7 col-md-8 col-sm-12 col-xs-12 ng_mt_20px">
      {matches.map( (match, index  ) => (
        <Tree
          key={index} 
          setHoverClass={this.setHoverClass} 
          matchLength={match.length} 
          hoverClass={active} 
          data={match}

          def={{ 
            primaryColor: "#e4144f", //// primary color usign on :hover team
            lineColor: 'grey', //// line color if game over
            
            teamWidth: 170,  /// team width :number
            radius: 5, //// road angle radius

            lineWeight: 3, //// road line width

            isShowTeamLogo: true, //// team: { logo: path to logo}
            defPathToTeamLogo: `/images/`, //// team: { logo: `${path :string}${logoname}` }
            defTeamLogo: `default_team_logo.png` //// if team logo exist show this logo
            
          }} />
        ) )}
      </div>
    );
  }
}

export default App;

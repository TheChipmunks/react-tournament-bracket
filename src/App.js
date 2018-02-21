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
            primaryColor: "#e4144f", 
            lineColor: 'grey', 
            teamWidth: 250, 
            radius: 0, 
            lineWeight: 3, 
            width: 3
          }} />
        ) )}
      </div>
    );
  }
}

export default App;

/// default 
/// Set default this.props
/// { color: '#ffffff', lineColor: '#e4144f', teamWidth: 250, radius: 4, lineWeight: 3 }

/// if (!lineColor) {
  // lineColor = primaryColor
// }
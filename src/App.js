import React, { Component } from 'react';
import Tree from './components/tree';
import { tree } from './localStore/data'
import './App.css'
class App extends Component {

  state = {
    active: ''
  }

  setHoverClass = (Active) => {
    this.setState({ active: Active.toString() })
  }
  
  render() {
    const { active } = this.state
    return (
    
      <div className="App">
        {tree.map( (grid, index) => (
          <Tree key={index} data={grid} setHoverClass={this.setHoverClass} hoverClass={active} def={{ primaryColor: "#e4144f", lineColor: 'grey', teamWidth: 250, radius: 4, lineWeight: 3, width: 3 }} />
        ))}
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
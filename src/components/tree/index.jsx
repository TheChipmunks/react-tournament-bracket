import React, { Component } from 'react'
import {
  TreeUI,
  CanvasEl
} from '../../ui'
import _ from 'lodash'
import Round from './round'


export class Tree extends Component {

  static = {
    timer: this.timer,
    resizeFunc: window.onresize = () => {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => this.drawTree(), 1000)
    }
  }

  state = {
    activeTeam: '',
    hoverTeam: '',
    width: 3,
    color: '#BBB',
    radius: 15,
    regionEl: this.tree,
    treeWidth: 0,
    treeHeight: 0,
    roundHeight: 400,
    isHideFirstRound: false
}
  componentDidMount = async () => {
    this.renderTree()
  }
  renderTree = async () => {
    try {
      const make = await this.setRoundHeight()
      make && this.drawTree()
    } catch (error) {
      console.log(error)
    }
  }
  setRoundHeight = () => {
    const h = this.tree.offsetHeight
    this.setState({ roundHeight: h + (h / 4) })
    return true
  }

  drawTree = () => {

    const { def, rightAlign, double } = this.props
    let { primaryColor, lineWeight, radius, lineColor } = def
    if (!lineColor) lineColor = primaryColor
    this.ctx = this.canvasEl.getContext('2d')
    const h = this.tree.offsetHeight
    const w = this.tree.offsetWidth
    this.setState({ treeWidth: w, treeHeight: h })
    this.canvasEl.width = w * 2
    this.canvasEl.height = h * 2
    this.canvasEl.style.width = w + 'px';
    this.canvasEl.style.height = h + 'px';
    this.ctx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height)
    this.ctx.scale(2, 2);
    var that = this;
    const rounds = this.tree.getElementsByClassName('round')
    let start
    let weight
    let color
    let j = 0
    let calcStart = rightAlign ? this.calcLeft : this.calcRight
    for (let thisRound of rounds) {
      j++
      const thisGames = thisRound.getElementsByClassName('game')
      const nextRound = rounds[j]
      if (!nextRound) return
      const nextGames = nextRound.getElementsByClassName('game')
      let e = 0
      for (let game of thisGames) {
        const nextGame = thisGames.length === nextGames.length ? nextGames[Math.floor(e)] : nextGames[Math.floor(e / 2)]        
        const emptyTeam = game.getElementsByClassName('miss')
        const winner = game.getElementsByClassName('team-winner')
        e++
        color = winner.length ? lineColor : '#ffffff'
        weight = winner.length ? lineWeight : 0.5
        
        start = calcStart(winner.length ? winner[0] : game)
        let startSelector = winner.length ? winner[0] : game;
        if ((j - 1) === 0 && emptyTeam.length) {
          game.classList.add('hide_game')
        } else {
          let endNode = nextGame
          let calcEnd = rightAlign ? this.calcRight : this.calcLeft
          const nextWinner = nextGame.getElementsByClassName('team')[(e + 1) % 2]
          const end = calcEnd(nextWinner ? nextWinner : endNode)
          const radiusAdjust = Math.min(radius, Math.abs(start.y - end.y) / 2)
          this.drawSCurve(start, end, color, weight, radius, radiusAdjust)
        }
      }
    }
  }

  drawRoad = () => {
    const { def, rightAlign } = this.props
    const { treeWidth, treeHeight } = this.state
    let { primaryColor, lineWeight, radius, lineColor } = def
    if (!lineColor) lineColor = primaryColor
    this.ctx = this.canvasActiveRoad.getContext('2d')
    this.canvasActiveRoad.width = treeWidth * 2
    this.canvasActiveRoad.height = treeHeight * 2
    this.canvasActiveRoad.style.width = treeWidth + 'px';
    this.canvasActiveRoad.style.height = treeHeight + 'px';
    this.ctx.clearRect(0, 0, treeHeight, treeHeight)
    this.ctx.scale(2, 2);
    const rounds = this.tree.getElementsByClassName('round')
    let start
    let weight
    let color
    let j = 0
    for (let i of rounds) {
      j++
      const thisGames = i.getElementsByClassName('game')
      const nextRound = rounds[j]
      if (!nextRound) continue
      const nextGames = nextRound.getElementsByClassName('game')
      const isLinear = thisGames.length === nextGames.length
      let e = 0
      for (let game of thisGames) {
        const winner = game.getElementsByClassName('team-winner')
        if (!winner) return
        const emptyTeam = game.getElementsByClassName('miss')
        const nextGame = isLinear ? nextGames[e] : nextGames[Math.floor(e / 2)]
        e++
        weight = winner.length ? lineWeight : 0.5
        let calcFunc = rightAlign ? this.calcLeft : this.calcRight
        start = calcFunc(winner.length ? winner[0] : game)
        let startSelector = winner.length ? winner[0] : game;
        (() => {
            let endNode = nextGame
            let calcFunc = rightAlign ? this.calcRight : this.calcLeft
            if (startSelector.classList.contains(`${this.props.hoverClass}`)) {
              color = primaryColor
            } else {
              return
            }
            const nextWinner = isLinear ? false : nextGame.getElementsByClassName('team')[(e + 1) % 2]
            const end = calcFunc(nextWinner ? nextWinner : endNode)
            const radiusAdjust = Math.min(radius, Math.abs(start.y - end.y) / 2)
            this.drawSCurve(start, end, color, weight, radius, radiusAdjust)
        })()
      }
    }
  }

  calcRight = (object) => {
    return {
      x: Math.round(object.getBoundingClientRect().left) + object.clientWidth + object.clientLeft,
      y: object.offsetTop + object.clientHeight / 2
    };
  }

  calcLeft = (object) => {
    return {
      x: Math.round(object.getBoundingClientRect().left),
      y: object.offsetTop + object.clientHeight / 2
    }
  }

  calcCenter = (object) => {
    return {
      x: Math.round(object.getBoundingClientRect().x) + object.clientWidth / 2,
      y: object.offsetTop + object.clientHeight / 2
    };
  }

  drawLine = (start, end) => {
    this.ctx.moveTo(start.x, start.y);
    this.ctx.lineTo(end.x, end.y);
  }

  drawCurve = (start, end, orientation, color, width, radius, radius2) => {
    if (!radius2) radius2 = radius
    this.ctx.beginPath()

    if (orientation === 'horizontal') {
      var anchor = { x: end.x, y: start.y };
    } else {
      var anchor = { x: start.x, y: end.y };
    }

    // calculate the point a certain distance along the line
    var m1 = this.lineDistanceFromEnd(start, anchor, radius);
    var m2 = this.lineDistanceFromEnd(end, anchor, radius2);

    this.drawLine(start, m1);
    this.ctx.bezierCurveTo(m1.x, m1.y, anchor.x, anchor.y, m2.x, m2.y);
    this.drawLine(m2, end);
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = width;
    this.ctx.lineCap = 'square';
    this.ctx.stroke();
    this.ctx.closePath();
  }

  drawSCurve = (start, end, color, width, radius, radius2) => {
    var midpoint = { x: (start.x + end.x) / 2, y: (start.y + end.y) / 2 };
    if (!radius2) radius2 = radius;

    this.drawCurve(start, midpoint, 'horizontal', color, width, radius, radius2);
    this.drawCurve(midpoint, end, 'vertical', color, width, radius2, radius);
  }

  lineDistanceFromEnd = (start, end, d) => {
    let [x, y] = [end.x, end.y]

    if (end.x - start.x < 0) x += d; // left
    if (end.x - start.x > 0) x -= d; // right
    if (end.y - start.y < 0) y += d; // up
    if (end.y - start.y > 0) y -= d; // down

    return { x: x, y: y };
  }

  render() {
    const { hoverTeam, treeHeight, roundHeight } = this.state
    const { data, def, setHoverClass, hoverClass } = this.props
    return [
      <TreeUI
        innerRef={tree => this.tree = tree}
        key={2}>
        <CanvasEl innerRef={canvasEl => this.canvasEl = canvasEl} key={1} id="canvas" />
        <CanvasEl innerRef={canvasActiveRoad => this.canvasActiveRoad = canvasActiveRoad} key={3} />
        {data.map((round, index) => (
          <Round round={round} key={index} drawRoad={this.drawRoad} def={def} roundHeight={roundHeight} hoverTeam={hoverClass} setHoverClass={setHoverClass} />
        )
        )}
      </TreeUI>
    ]
  }
}

export default Tree

import React from 'react';

import './home.scss';

const GRID_WIDTH = 3; //32;
const GRID_HEIGHT = 3; //32;

class Home extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      grid: [],
    };

    this.startSimulation = this.startSimulation.bind(this);
    this.stopSimulation = this.stopSimulation.bind(this);
    this.runCycle = this.runCycle.bind(this);
  }

  componentDidMount() {
    this.randomizeGrid();
  }

  componentWillUnmount() {
    this.stopSimulation();
  }

  getRandomBoolean() {
    return Math.floor(Math.random() * Math.floor(2)) > 0;
  }

  randomizeGrid() {
    const grid = new Array(GRID_HEIGHT);
    for (let y = 0; y < GRID_HEIGHT; y++) {
      grid[y] = new Array(GRID_WIDTH);
      for (let x = 0; x < GRID_WIDTH; x++) {
        grid[y][x] = this.getRandomBoolean();
      }
    }

    this.setState({
      grid: grid,
    }, this.startSimulation);
  }

  startSimulation() {
    const simulationInterval = setInterval(this.runCycle, 2000);
    this.setState({
      simulationInterval: simulationInterval,
    })
  }

  stopSimulation() {
    if (this.state.simulationInterval) {
      clearInterval(this.state.simulationInterval);
      this.setState({
        simulationInterval: null,
      });
    }
  }

  runCycle() {
    const oldGrid = this.state.grid;

    const newGrid = new Array(GRID_HEIGHT);
    for (let y = 0; y < GRID_HEIGHT; y++) {
      newGrid[y] = new Array(GRID_WIDTH);
      for (let x = 0; x < GRID_WIDTH; x++) {
        const alive = this.countSurrounding(x, y);
        if (oldGrid[y, x]) {
          // current cell is alive
          if (alive >= 2 && alive <= 3) {
            newGrid[y][x] = true;
          } else {
            newGrid[y][x] = false;
          }
        } else {
          // current cell is dead
          if (alive === 3) {
            newGrid[y][x] = true;
          }
        }
      }
    }

    //console.log('runCycle', newGrid);

    this.setState({
      grid: newGrid,
    });
  }

  countSurrounding(x, y) {
    let alive = 0;

    // top
    if (y > 0) {
      const rowResult = this.countRow(x, y - 1);
      alive += rowResult;
    }

    // middle
    const rowResult = this.countRow(x, y, false);
    alive += rowResult;

    // bottom
    if (y < GRID_HEIGHT - 1) {
      const rowResult = this.countRow(x, y + 1);
      alive += rowResult;
    }

    return alive;
  }

  countRow(x, y, countMiddle = true) {
    let alive = 0;
    const grid = this.state.grid;
    const row = grid[y];

    // left
    if (x > 0) {
      if (row[x - 1]) {
        alive++;
      }
    }

    // center
    if (countMiddle) {
      if (row[x]) {
        alive++;
      }
    }

    // right
    if (x < GRID_WIDTH - 1) {
      if (row[x + 1]) {
        alive++;
      }
    }

    return alive;
  }

  render() {
    const grid = this.state.grid;

    return (
      <div className="main">
        <div className="toolbar">
          { this.state.simulationInterval
            ? <button onClick={this.stopSimulation}>Stop</button>
            : <button onClick={this.startSimulation}>Start</button>
          }
        </div>
        <div className="grid-of-life">
          { grid.map((row, rowIndex) => {
            return (
              <div key={rowIndex} className="grid-row">
                { row.map((cell, cellIndex) => {
                  return (
                    <div key={cellIndex} className={'grid-cell ' + (cell ? 'alive' : 'dead')}>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}

export default Home;
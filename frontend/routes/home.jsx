import React from "react";

import "./home.scss";

const GRID_WIDTH = 6; //32;
const GRID_HEIGHT = 6; //32;

class Home extends React.PureComponent {
  constructor(props) {
    super(props);

    this.xDimension = React.createRef();
    this.yDimension = React.createRef();

    this.state = {
      gridWidth: GRID_WIDTH,
      gridHeight: GRID_HEIGHT,
      grid: []
    };

    this.changeSize = this.changeSize.bind(this);
    this.toggleBox = this.toggleBox.bind(this);
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
    const grid = new Array(this.state.gridHeight);
    /*for (let y = 0; y < this.state.gridHeight; y++) {
      grid[y] = new Array(this.state.gridWidth);
      for (let x = 0; x < this.state.gridWidth; x++) {
        grid[y][x] = this.getRandomBoolean();
      }
    }*/
    // blinker
    /*grid[0] = [0, 0, 0, 0, 0];
    grid[1] = [0, 0, 1, 0, 0];
    grid[2] = [0, 0, 1, 0, 0];
    grid[3] = [0, 0, 1, 0, 0];
    grid[4] = [0, 0, 0, 0, 0];*/

    // toad
    grid[0] = [0, 0, 0, 0, 0, 0];
    grid[1] = [0, 0, 0, 1, 0, 0];
    grid[2] = [0, 1, 0, 0, 1, 0];
    grid[3] = [0, 1, 0, 0, 1, 0];
    grid[4] = [0, 0, 1, 0, 0, 0];
    grid[5] = [0, 0, 0, 0, 0, 0];

    // beacon
    /*grid[0] = [0, 0, 0, 0, 0, 0];
    grid[1] = [0, 1, 1, 0, 0, 0];
    grid[2] = [0, 1, 0, 0, 0, 0];
    grid[3] = [0, 0, 0, 0, 1, 0];
    grid[4] = [0, 0, 0, 1, 1, 0];
    grid[5] = [0, 0, 0, 0, 0, 0];*/

    this.setState({
      grid: grid
    });
  }

  changeSize() {
    const gridWidth = Number.parseInt(this.xDimension.current.value);
    const gridHeight = Number.parseInt(this.yDimension.current.value);
    console.log(gridWidth, gridHeight);
    const newGrid = new Array(gridHeight);

    const grid = this.state.grid;

    for (let y = 0; y < gridHeight; y++) {
      newGrid[y] = new Array(gridWidth);
      for (let x = 0; x < gridWidth; x++) {
        if (y < this.state.gridHeight && x < this.state.gridWidth) {
          newGrid[y][x] = grid[y][x];
        } else {
          newGrid[y][x] = 0;
        }
      }
    }

    this.setState({
      gridWidth: gridWidth,
      gridHeight: gridHeight,
      grid: newGrid
    });
  }

  toggleBox(y, x) {
    const grid = this.state.grid;

    this.setState({
      grid: [
        ...grid.slice(0, y),
        [
          ...grid[y].slice(0, x),
          this.state.grid[y][x] ? 0 : 1,
          ...grid[y].slice(x + 1)
        ],
        ...grid.slice(y + 1)
      ]
    });
  }

  startSimulation() {
    const simulationInterval = setInterval(this.runCycle, 1000);
    this.setState({
      simulationInterval: simulationInterval
    });
  }

  stopSimulation() {
    if (this.state.simulationInterval) {
      clearInterval(this.state.simulationInterval);
      this.setState({
        simulationInterval: null
      });
    }
  }

  runCycle() {
    const oldGrid = this.state.grid;
    const gridHeight = this.state.gridHeight;
    const gridWidth = this.state.gridWidth;

    const newGrid = new Array(gridHeight);
    for (let y = 0; y < gridHeight; y++) {
      newGrid[y] = new Array(gridWidth);
      for (let x = 0; x < gridWidth; x++) {
        const alive = this.countSurrounding(x, y);
        if (oldGrid[y][x]) {
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
          } else {
            newGrid[y][x] = false;
          }
        }
      }
    }

    this.setState({
      grid: newGrid
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
    if (y < this.state.gridHeight - 1) {
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
    if (x < this.state.gridWidth - 1) {
      if (row[x + 1]) {
        alive++;
      }
    }

    return alive;
  }

  render() {
    const grid = this.state.grid;
    const simulationRunning = !!this.state.simulationInterval;

    return (
      <div className="main">
        <div className="toolbar">
          {simulationRunning ? (
            <button onClick={this.stopSimulation}>Stop</button>
          ) : (
            <button onClick={this.startSimulation}>Start</button>
          )}
          <input type="text" ref={this.xDimension} style={{ width: "30px" }} />
          <input type="text" ref={this.yDimension} style={{ width: "30px" }} />
          <button onClick={this.changeSize}>Update Size</button>
        </div>
        <div className="grid-of-life">
          {grid.map((row, rowIndex) => {
            return (
              <div key={rowIndex} className="grid-row">
                {row.map((cell, cellIndex) => {
                  return (
                    <div
                      key={cellIndex}
                      className={"grid-cell " + (cell ? "alive" : "dead")}
                      onClick={
                        !simulationRunning
                          ? () => this.toggleBox(rowIndex, cellIndex)
                          : null
                      }
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Home;

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// En React, componentes de función son una forma más simple de escribir componentes
// que solo contienen un método render y no tiene estado propio.
// En lugar de definir una clase que extiende React.Component, podemos escribir una función que toma props
// como parámetros y retorna lo que se debe renderizar.
// Componentes de función son menos tediosos de escribir que clases, y muchos componentes pueden ser expresados de esta manera.
/*class Square extends React.Component {
  render() {
    return (
      <button
        className="square"
        onClick={() => this.props.jugar()}
      >
        {this.props.value}
      </button>
    );
  }
}*/

// Componente de función
function Square(props) {
  return (
    <button
      className="square"
      onClick={() => props.jugar()}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {

  renderSquare(i) {
    return <Square
      value={this.props.squares[i]}
      jugar={() => this.props.jugar(i)}
    />;
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      history: [{
        squares: Array(9).fill('-'),
      }],
      xIsNext: true,
    }
  }

  render() {
    const current = this.state.history[this.state.history.length - 1];
    const winner = calculateWinner(current.squares);
    let status;
    if (winner !== '-') {
      status = 'Ganador ' + winner;
    } else {
      status = 'Juega ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            jugar={(i) => this.ejecutarJugada(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }

  ejecutarJugada(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (squares[i] !== '-' || calculateWinner(squares) !== '-') {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !this.state.xIsNext,
    });
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return '-';
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

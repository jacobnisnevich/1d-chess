class App {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.turn = 'white';
    this.selectedTile = null;
    this.gameState = [
      'black_king', 
      'black_pawn', 
      null, null, null, null, 
      'white_pawn', 
      'white_king'
    ];

    document.getElementById('turn').innerHTML = 'White to play.';

    this.canvas.addEventListener('click', (e) => this.onClick(e));
  }

  reset() {
    this.drawChessBoard();
    this.drawChessPieces();
  };

  drawChessBoard() {
    this.ctx.fillStyle = 'brown';
    this.ctx.fillRect(10, 10, 100, 670);

    for (let i = 0; i <= 6; i += 2) {
      this.colorSquare(i, 'white');
    }

    for (let i = 1; i <= 7; i += 2) {
      this.colorSquare(i, 'grey');
    }
  }

  drawChessPieces() {
    this.gameState.forEach((piece, gridSquare) => {
      if (piece) {
        this.drawChessPiece(piece, gridSquare);
      }
    });
  }

  drawChessPiece(piece, gridSquare) {
    let img = new Image();
    img.src = 'img/' + piece + '.png';
    img.onload = () => {
      this.ctx.drawImage(img, 30, this.getPieceY(gridSquare), 60, 60);
    }
  }

  getPieceY(gridSquare) {
    return (30 + (gridSquare * 80));
  }

  getSquareColor(gridSquare) {
    if (gridSquare % 2) {
      return 'grey';
    } else {
      return 'white';
    }
  }

  getPieceColor(piece) {
    return piece.match(/(.*)_.*/)[1];
  }

  colorSquare(gridSquare, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(20, 20 + (gridSquare * 80), 80, 80);
  }

  selectTile(gridSquare) {
    let selectedPiece = this.gameState[this.selectedTile];
    let piece = this.gameState[gridSquare];

    if (this.selectedTile == gridSquare) {
      this.reset();
      this.selectedTile = null;
      this.colorSquare(gridSquare, (this.getSquareColor(gridSquare)));
    } else if (piece && this.getPieceColor(piece) === this.turn) {
      this.reset();
      this.selectedTile = gridSquare;
      this.colorSquare(gridSquare, 'green');
      this.showMovementTiles(piece, gridSquare);
    } else if (selectedPiece) {
      if (this.isValidMovementTile(selectedPiece, this.selectedTile, gridSquare)) {
        this.movePiece(this.selectedTile, gridSquare);
        this.reset();
        this.selectedTile = null;
        this.endTurn();
      }
    }
  }

  endTurn() {
    if (this.turn === 'white') {
      this.turn = 'black';
      document.getElementById('turn').innerHTML = 'Black to play.';
    } else {
      this.turn = 'white';
      document.getElementById('turn').innerHTML = 'White to play.';
    }
  }

  movePiece(from, to) {
    this.gameState[to] = this.gameState[from];
    this.gameState[from] = null;
  }

  showMovementTiles(piece, gridSquare) {
    for (let i = 0; i < 8; i++) {
      if (this.isValidMovementTile(piece, gridSquare, i)) {
        this.colorSquare(i, 'lightblue');
      }
    }
  }

  isValidMovementTile(piece, pieceSquare, gridSquare) {
    if (this.gameState[gridSquare] || pieceSquare === gridSquare) {
      return false;
    }

    if (piece === 'black_king') {
      if (Math.abs(pieceSquare - gridSquare) > 1) {
        return false;
      } else {
        return true;
      }
    } else if (piece === 'black_pawn') {
      if (gridSquare === pieceSquare + 1) {
        return true;
      } else {
        return false;
      }
    } else if (piece === 'white_pawn') {
      if (gridSquare === pieceSquare - 1) {
        return true;
      } else {
        return false;
      }
    } else if (piece === 'white_king') {
      if (Math.abs(pieceSquare - gridSquare) > 1) {
        return false;
      } else {
        return true;
      }
    }
  }

  onClick(e) {
    let mousePosition = this.getMousePos(this.canvas, e);

    let gridSquare = this.getGridSquare(mousePosition);

    if (gridSquare > -1) {
      this.selectTile(gridSquare);
    }
  }

  getMousePos(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }

  getGridSquare(m) {
    if (m.x > 20 && m.x < 100 && m.y > 20 && m.y < 660) {
      if (m.y < 100) {
        return 0;
      } else if (m.y < 180) {
        return 1;
      } else if (m.y < 260) {
        return 2;
      } else if (m.y < 340) {
        return 3;
      } else if (m.y < 420) {
        return 4;
      } else if (m.y < 500) {
        return 5;
      } else if (m.y < 580) {
        return 6;
      } else if (m.y < 660) {
        return 7;
      }
    }
  }
};
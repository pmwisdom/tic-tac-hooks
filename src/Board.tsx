import React, {useEffect, useState} from 'react';
import {Tile} from './Tile';

export type TileState = null | 'X' | 'O';
type PlayerState = 'player1' | 'player2';

const initialTiles: TileState[][] = [
	[null, null, null],
	[null, null, null],
	[null, null, null]
];

const Board = () => {
	const [tiles, setTiles] = useState<TileState[][]>(initialTiles);
	const [activePlayer, setActivePlayer] = useState<PlayerState>('player1');
	const [winningPlayer, setWinningPlayer] = useState<PlayerState | null>(
		null
	);

	useEffect(
		() => {
			const {hasWon, winningPlayer} = checkWinConditions();

			if (hasWon && winningPlayer) {
				setWinningPlayer(winningPlayer);
			}
		},
		[tiles]
	);

	function handleNextGame() {
		setWinningPlayer(null);
		setTiles(initialTiles);
	}

	function collectVerticalTiles(tiles: TileState[]) {
		return tiles.join('');
	}

	function collectHorizontalTiles(tiles: TileState[][], tileIndex: number) {
		let horizTiles = [];

		for (const row of tiles) {
			horizTiles.push(row[tileIndex]);
		}

		return horizTiles.join('');
	}

	function checkWinConditions() {
		let hasWon = false;
		let winningPlayer: PlayerState | null = null;
		let tileSets: string[] = [];

		for (const row of tiles) {
			tileSets.push(collectVerticalTiles(row));
		}

		for (let i = 0; i < tiles.length; i++) {
			tileSets.push(collectHorizontalTiles(tiles, i));
		}

		for (const set of tileSets) {
			if (set === 'XXX' || set === 'OOO') {
				hasWon = true;

				if (set === 'XXX') {
					winningPlayer = 'player1';
				} else {
					winningPlayer = 'player2';
				}

				break;
			}
		}

		return {hasWon, winningPlayer};
	}

	function setTileForIndex(
		rowIndex: number,
		tileIndex: number,
		tileState: TileState
	): TileState[][] {
		return tiles.map((row, i) => {
			return row.map((tile, j) => {
				if (i === rowIndex && tileIndex === j) {
					return tileState;
				}

				return tile;
			});
		});
	}

	function setTileForPlayer(row: number, tile: number) {
		if (activePlayer === 'player1') {
			setTiles(setTileForIndex(row, tile, 'X'));
		} else {
			setTiles(setTileForIndex(row, tile, 'O'));
		}

		setActivePlayer(activePlayer === 'player1' ? 'player2' : 'player1');
	}

	return (
		<div className="board-container">
			<div>
				Active Player:{' '}
				{activePlayer === 'player1' ? 'Player 1' : 'Player 2'}
			</div>
			<div className="board">
				{tiles.map((row, rowIndex: number) => {
					return (
						<div className="row">
							{row.map((tile, tileIndex) => (
								<Tile
									tileIndex={tileIndex}
									rowIndex={rowIndex}
									tileState={tiles[rowIndex][tileIndex]}
									onClick={setTileForPlayer}
								/>
							))}
						</div>
					);
				})}
			</div>
			{winningPlayer && (
				<div className="end-game-modal-container">
					<div className="end-game-modal">
						{`${winningPlayer} has won! Press continue to play the next game`}
						<button onClick={handleNextGame}>Continue</button>
					</div>
				</div>
			)}
		</div>
	);
};

export {Board};

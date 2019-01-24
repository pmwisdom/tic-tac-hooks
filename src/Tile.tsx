import React, {useEffect, useState} from 'react';
import {TileState} from './Board';

interface ITileProps {
	rowIndex: number;
	tileIndex: number;
	onClick(rowIndex: number, tileIndex: number): void;
	tileState: TileState;
}

const Tile: React.SFC<ITileProps> = ({
	rowIndex,
	tileIndex,
	onClick,
	tileState
}) => {
	const handleClick = () => {
		if (tileState) {
			return;
		}

		onClick(rowIndex, tileIndex);
	};

	return (
		<div className="tile" onClick={handleClick}>
			<div
				style={{
					position: 'absolute',
					top: 0,
					bottom: 0,
					left: 0,
					right: 0,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				{tileState ? (tileState === 'X' ? 'X' : 'O') : ''}
			</div>
		</div>
	);
};

export {Tile};

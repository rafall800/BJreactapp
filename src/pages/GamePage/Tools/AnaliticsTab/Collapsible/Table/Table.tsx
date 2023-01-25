import { FC } from 'react';
import { TableTab } from '../../../../../../components/textStyles/TableTab.styles';
import { HandGameData } from '../../../../../../hooks/useBlackJackGameState';
import { countHandValue } from '../../../../../../utils/functions';
import { StyledMove, StyledTable } from './Table.styles';

interface TableProps {
  moves: HandGameData[];
}

const TableHeaders: string[] = ['you', 'dealer', 't/c', 'your option', 'best option'];

const Table: FC<TableProps> = ({ moves }) => {
  return (
    <StyledTable>
      <thead>
        <tr>
          {TableHeaders.map((header) => {
            return (
              <th key={header} scope="col">
                <TableTab>{header}</TableTab>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {moves
          .map((move, index) => {
            return (
              <StyledMove key={`move${index}`} isCorrect={move.playerOption === move.bestOption}>
                <th>{countHandValue(move.playerHand)}</th>
                <th>{move.dealerHand.value}</th>
                <th>{move.trueCount}</th>
                <th>{move.playerOption}</th>
                <th>{move.bestOption}</th>
              </StyledMove>
            );
          })
          .reverse()}
      </tbody>
    </StyledTable>
  );
};

export default Table;

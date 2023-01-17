import { FC, useContext } from 'react';
import { BlackJackGameContext } from '../../pages/GamePage/GameManager/GameProvider';
import { TableTab } from '../../textStyles/TableTab.styles';
import { StyledAnaliticsTab, StyledOuterTable } from './AnaliticsTab.styles';

interface AnaliticsTabProps {
  title: string;
}

const TableHeaders: string[] = ['you', 'dealer', 't/c', 'your option', 'best option'];

const AnaliticsTab: FC<AnaliticsTabProps> = () => {
  const { gameData } = useContext(BlackJackGameContext);
  console.log(gameData);
  return (
    <StyledAnaliticsTab>
      <StyledOuterTable>
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
          {gameData.map((game, index) => {
            return (
              <tr key={`game${index}`}>
                <td colSpan={4}>{`game${index + 1}`}</td>
                <td>
                  {game.reduce((acc, curr) => {
                    return acc + curr.betOutcome;
                  }, 0)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </StyledOuterTable>
    </StyledAnaliticsTab>
  );
};

export default AnaliticsTab;

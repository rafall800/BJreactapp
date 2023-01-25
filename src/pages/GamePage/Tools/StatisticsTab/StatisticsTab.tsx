import { FC, useContext } from 'react';
import Charts from '../../../../components/Charts/Charts';
import { BlackJackGameContext } from '../../../../contexts/GameProvider';
import { initialData } from '../../../../utils/consts';
import { StyledStatisticsTab } from './StatisticsTab.styles';

interface StatisticsTabProps {
  title: string;
}

const StatisticsTab: FC<StatisticsTabProps> = () => {
  const { runningCount, balance, gameData, shoe } = useContext(BlackJackGameContext);
  const decksLeft = shoe.length / 52;
  const trueCount = Math.round((runningCount / decksLeft) * 100) / 100;
  let movesNumber: number = 0;
  let correctMovesNumber: number = 0;
  gameData.forEach((deal) => {
    deal.forEach((hand) => {
      hand.handData.forEach((move) => {
        movesNumber++;
        if (move.bestOption === move.playerOption) correctMovesNumber++;
      });
    });
  });
  let performance;
  movesNumber === 0 ? (performance = 0) : (performance = Math.round((correctMovesNumber / movesNumber) * 100) / 100);
  return (
    <StyledStatisticsTab>
      <table>
        <thead>
          <tr>
            <th title="Difference between current balance and initial balance">Balance:</th>
            <th title="Correct decisions amount divided by overall moves amount">Performance:</th>
            <th>Running Count:</th>
            <th title="Cards left in the shoe">Cards Left:</th>
            <th title="Running count divided by cards left in the shoe">True Count:</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>{(balance - initialData.balance > 0 ? '+' : '') + `${balance - initialData.balance}`}</th>
            <th>{performance}</th>
            <th>{runningCount}</th>
            <th>{`${shoe.length} (~${Math.round(decksLeft)} decks)`}</th>
            <th>{trueCount}</th>
          </tr>
        </tbody>
      </table>
      <Charts defaultView="Deviations" />
    </StyledStatisticsTab>
  );
};

export default StatisticsTab;

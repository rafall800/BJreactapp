import { FC, useContext } from 'react';
import { BlackJackGameContext } from '../../pages/GamePage/GameManager/GameProvider';
import { StyledAnaliticsTab } from './AnaliticsTab.styles';
import CollapisbleDeal from './Collapsible/Collapsible/CollapsibleDeal';

interface AnaliticsTabProps {
  title: string;
}

const AnaliticsTab: FC<AnaliticsTabProps> = () => {
  const { gameData } = useContext(BlackJackGameContext);
  return (
    <StyledAnaliticsTab>
      {gameData.reverse().map((deal, index) => {
        return (
          <CollapisbleDeal
            key={`deal${gameData.length - index}`}
            deal={deal}
            dealNumber={gameData.length - index}
            open={index === 0}
          />
        );
      })}
    </StyledAnaliticsTab>
  );
};

export default AnaliticsTab;

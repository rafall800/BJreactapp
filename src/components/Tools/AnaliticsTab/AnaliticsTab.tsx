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
      {gameData
        .map((deal, index) => {
          return <CollapisbleDeal key={`deal${index}`} deal={deal} dealNumber={index + 1} open={index === 0} />;
        })
        .reverse()}
    </StyledAnaliticsTab>
  );
};

export default AnaliticsTab;

import { FC, useContext } from 'react';
import Button from '../Button/Button';
import { BlackJackGameContext } from '../pages/GamePage/GameManager/GameProvider';
import { Speeds, StyledGameSettings } from './GameSettings.styles';

const GameSettings: FC = () => {
  const dealSpeeds: string[] = ['25', '50', '75', '100'];
  const { setDealSpeed } = useContext(BlackJackGameContext);
  return (
    <StyledGameSettings>
      <Speeds>
        {dealSpeeds.map((speed) => {
          return (
            <Button key={speed} variant="tab" onClick={() => setDealSpeed(0.5 * (Number(speed) / 100))}>
              {speed + '%'}
            </Button>
          );
        })}
      </Speeds>
    </StyledGameSettings>
  );
};

export default GameSettings;

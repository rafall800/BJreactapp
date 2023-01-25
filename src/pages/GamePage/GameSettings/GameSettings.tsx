import { FC, useContext, useState } from 'react';
import Button from '../../../components/Button/Button';
import { Header2 } from '../../../components/textStyles/Header2.styles';
import { BlackJackGameContext } from '../../../contexts/GameProvider';
import { useDialog } from '../../../hooks/useDialog';
import { ButtonWrapper, Speeds, StyledGameSettings } from './GameSettings.styles';
import ResetGameDialog from './ResetGameDialog/ResetGameDialog';

const GameSettings: FC = () => {
  const dealSpeeds: string[] = ['25', '50', '100', '150', '200'];
  const { setDealSpeed } = useContext(BlackJackGameContext);
  const { open, isOpen, close } = useDialog();
  const [activeDealSpeed, setActiveDealSpeed] = useState<number>(2);

  const handleActivateSpeed = (speed: string, index: number) => {
    setDealSpeed(0.5 / (Number(speed) / 100));
    setActiveDealSpeed(index);
  };
  return (
    <StyledGameSettings>
      <Header2>Set deal speed:</Header2>
      <Speeds>
        {dealSpeeds.map((speed, index) => {
          return (
            <ButtonWrapper key={speed} isActive={activeDealSpeed === index ? true : false}>
              <Button variant="tab" onClick={() => handleActivateSpeed(speed, index)}>
                {speed + '%'}
              </Button>
            </ButtonWrapper>
          );
        })}
      </Speeds>
      <Button variant="stand" onClick={open}>
        reset game
      </Button>
      <ResetGameDialog isOpen={isOpen} close={close} />
    </StyledGameSettings>
  );
};

export default GameSettings;
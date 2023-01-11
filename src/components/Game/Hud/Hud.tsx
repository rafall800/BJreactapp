import { FC, useContext } from 'react';
import Button from '../../Button/Button';
import { BlackJackGameContext } from '../../pages/GamePage/GameManager/GameProvider';
import { Header2 } from '../../textStyles/Header2.styles';
import { Paragraph } from '../../textStyles/Paragrapsh.styles';
import { BetOptions, DecisionOptions, Stakes, StyledHud, YourBalance, YourBet } from './Hud.styles';

const Hud: FC = () => {
  const betStakes: string[] = ['5', '10', '25', '50', '100'];

  const {
    bet,
    balance,
    gameRunning,
    bettingStage,
    setGameRunning,
    setBet,
    handlePlayerBet,
    handlePLayerHit,
    handlePLayerStand
  } = useContext(BlackJackGameContext);

  const handleBet = () => {
    if (bet === 0) return;
    if (!gameRunning) setGameRunning(true);
    handlePlayerBet();
  };

  return (
    <StyledHud>
      {!bettingStage && (
        <DecisionOptions>
          <Button variant="primary" onClick={handlePLayerHit}>
            hit
          </Button>
          <Button variant="doubledown">x2</Button>
          <Button variant="split">split</Button>
          <Button variant="stand" onClick={handlePLayerStand}>
            stand
          </Button>
        </DecisionOptions>
      )}
      {bettingStage && (
        <BetOptions>
          <YourBalance>
            <Header2>Your balance: {balance}</Header2>
          </YourBalance>
          <YourBet>
            <Paragraph>Your bet: {bet}</Paragraph>
          </YourBet>
          <Stakes>
            {betStakes.map((stake) => {
              return (
                <Button key={stake} variant="tab" onClick={() => setBet(bet + Number(stake))}>
                  {'+' + stake}
                </Button>
              );
            })}
            <Button variant="tab" onClick={() => setBet(0)}>
              CLEAR
            </Button>
          </Stakes>
          <Button variant="primary" onClick={() => handleBet()}>
            bet
          </Button>
        </BetOptions>
      )}
    </StyledHud>
  );
};

export default Hud;

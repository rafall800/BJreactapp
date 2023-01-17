import { FC, useContext, useEffect, useState } from 'react';
import Button from '../../Button/Button';
import { BlackJackGameContext } from '../../pages/GamePage/GameManager/GameProvider';
import { Player } from '../../pages/GamePage/GameManager/useBlackJackGameState';
import { countHandValue } from '../../pages/GamePage/GameManager/util';
import { Header2 } from '../../textStyles/Header2.styles';
import { Paragraph } from '../../textStyles/Paragrapsh.styles';
import { BetOptions, DecisionOptions, Decisions, Stakes, StyledHud, YourBalance, YourBet } from './Hud.styles';

const Hud: FC = () => {
  const betStakes: string[] = ['5', '10', '25', '50', '100'];

  const {
    bet,
    balance,
    players,
    gameRunning,
    bettingStage,
    splitHandStage,
    setGameRunning,
    setBet,
    handlePlayerBet,
    handlePlayerHit,
    handlePlayerStand,
    handlePlayerDoubledown,
    handlePlayerSplit,
    handlePlayerSurrender
  } = useContext(BlackJackGameContext);

  const [currentHand, setCurrentHand] = useState<Player | undefined>(players.find((player) => player.isPlaying));

  useEffect(() => {
    const currentPlayer = players.find((player) => player.isPlaying);
    if (!currentPlayer) return;
    let currentHand = currentPlayer;
    if (splitHandStage) {
      const splitHand = currentPlayer.splitHands.find((hand) => hand.isPlaying);
      if (splitHand) currentHand = splitHand;
    }
    if (countHandValue(currentHand.hand) >= 21) handlePlayerStand();
    setCurrentHand(currentHand);
  }, [players, balance, splitHandStage, handlePlayerStand]);

  const handleBet = () => {
    if (bet === 0) return;
    if (!gameRunning) setGameRunning(true);
    handlePlayerBet();
  };
  return (
    <StyledHud>
      {!bettingStage && (
        <DecisionOptions>
          <Decisions>
            <Button variant="primary" onClick={handlePlayerHit}>
              hit
            </Button>
            <Button variant="doubledown" disabled={!currentHand?.canDoubledown} onClick={handlePlayerDoubledown}>
              x2
            </Button>
            <Button variant="split" disabled={!currentHand?.canSplit} onClick={handlePlayerSplit}>
              split
            </Button>
            <Button variant="stand" onClick={handlePlayerStand}>
              stand
            </Button>
            <Button variant="surrender" disabled={!currentHand?.canSurrender} onClick={handlePlayerSurrender}>
              surr
            </Button>
          </Decisions>
          <Paragraph>Your balance: {balance}</Paragraph>
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

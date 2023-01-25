import { FC, useContext, useEffect, useState } from 'react';
import Button from '../../../../components/Button/Button';
import { Header2 } from '../../../../components/textStyles/Header2.styles';
import { Paragraph } from '../../../../components/textStyles/Paragrapsh.styles';
import { BlackJackGameContext } from '../../../../contexts/GameProvider';
import { Player } from '../../../../hooks/useBlackJackGameState';
import { countHandValue } from '../../../../utils/functions';
import { BetOptions, DecisionOptions, Decisions, FlexBox, Stakes, StyledHud, YourBalance, YourBet } from './Hud.styles';

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
            <FlexBox>
              <Button variant="primary" onClick={handlePlayerHit}>
                hit
              </Button>
              <Button variant="doubledown" disabled={!currentHand?.canDoubledown} onClick={handlePlayerDoubledown}>
                x2
              </Button>
              <Button variant="stand" onClick={handlePlayerStand}>
                stand
              </Button>
            </FlexBox>
            <FlexBox>
              <Button variant="split" disabled={!currentHand?.canSplit} onClick={handlePlayerSplit}>
                split
              </Button>
              <Button variant="surrender" disabled={!currentHand?.canSurrender} onClick={handlePlayerSurrender}>
                surr
              </Button>
            </FlexBox>
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

import { FC, useContext, useEffect } from 'react';
import Button from '../../Button/Button';
import { Header2 } from '../../textStyles/Header2.styles';
import { Paragraph } from '../../textStyles/Paragrapsh.styles';
import { BlackJackGameContext } from '../GameManager/BlackJackGameContext';
import { BetOptions, DecisionOptions, Stakes, StyledHud, YourBalance, YourBet } from './Hud.styles';

const Hud: FC = () => {
  const betStakes: string[] = ['5', '10', '25', '50', '100'];

  const { bet, balance, deck, setBet, setBalance, startGame, startDeal } = useContext(BlackJackGameContext);
  useEffect(() => {
    startGame();
  }, [startGame]);
  console.log(deck);
  return (
    <StyledHud>
      <DecisionOptions>
        <Button variant="primary">hit</Button>
        <Button variant="doubledown">x2</Button>
        <Button variant="split">split</Button>
        <Button variant="stand">stand</Button>
      </DecisionOptions>
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
        <Button
          variant="primary"
          onClick={() => {
            setBalance(balance - bet);
            startDeal();
          }}
        >
          bet
        </Button>
      </BetOptions>
    </StyledHud>
  );
};

export default Hud;

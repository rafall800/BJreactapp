import { FC, useRef } from 'react';
import Button from '../../Button/Button';
import { Header2 } from '../../textStyles/Header2.styles';
import { Paragraph } from '../../textStyles/Paragrapsh.styles';
import { BetOptions, DecisionOptions, Stakes, StyledHud, YourBalance, YourBet } from './Hud.styles';
import { add, strartGame, substract } from './utils';

const Hud: FC = () => {
  const betStakes: string[] = ['5', '10', '25', '50', '100'];
  const yourBetRef = useRef<HTMLParagraphElement>(null);
  const yourBalanceRef = useRef<HTMLHeadingElement>(null);
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
          <Header2>Your balance:</Header2>
          <Header2 ref={yourBalanceRef}>1000</Header2>
        </YourBalance>
        <YourBet>
          <Paragraph>Your bet:</Paragraph>
          <Paragraph ref={yourBetRef}></Paragraph>
        </YourBet>
        <Stakes>
          {betStakes.map((stake) => {
            return (
              <Button
                key={stake}
                variant="tab"
                onClick={() => {
                  add(yourBetRef, stake);
                }}
              >
                {'+' + stake}
              </Button>
            );
          })}
          <Button
            variant="tab"
            onClick={() => {
              if (yourBetRef.current) yourBetRef.current.innerHTML = '0';
            }}
          >
            CLEAR
          </Button>
        </Stakes>
        <Button
          variant="primary"
          onClick={() => {
            substract(yourBalanceRef, yourBetRef);
            strartGame();
          }}
        >
          bet
        </Button>
      </BetOptions>
    </StyledHud>
  );
};

export default Hud;

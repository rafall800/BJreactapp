import { FC } from 'react';
import Card from '../../../Card/Card';
import { ListElement } from '../../../LandingPageContent/LandingPageContent.styles';
import { Header3 } from '../../../textStyles/Header3.styles';
import { Paragraph } from '../../../textStyles/Paragrapsh.styles';
import { getCards } from '../../GamePage/GameManager/util';
import { FlexBox, TextBlock } from '../HowToPlay/HowToPlay.styles';
import { CardsBox, Row } from './HowToCountCards.styles';
import RoundPreview from '../../../../assets/previews/DecisionMaking.png';

const HowToCountCards: FC = () => {
  const lowCards: string[] = ['2P', '3P', '4P', '5P', '6P'];
  const middleCards: string[] = ['7P', '8P', '9P'];
  const highCards: string[] = ['10P', 'JP', 'QP', 'KP', 'AP'];
  return (
    <FlexBox>
      <TextBlock>
        <Header3>What is card counting giving you?</Header3>
        <Paragraph>
          When there are more Aces and 10 value cards (10s, Jacks, Queens, and Kings) in the deck, the odds in blackjack
          are in the player's advantage. Therefore, card counting is just keeping track of the ratio of low cards to
          high cards. So for example when the player has the knowlage there is much more high value cards in the shoe,
          he can assume that the next couple dealt cards should be high value cards and change his play accordingly.
          Such system can give the player high enough edge over the casino which turns into long-term winnings.
        </Paragraph>
      </TextBlock>
      <TextBlock>
        <Header3>How to count cards?</Header3>
        <ul>
          <ListElement>
            <Paragraph>1. Assign a value to every card</Paragraph>
          </ListElement>
          <ListElement>
            <Paragraph>2. Keep a “Running Count”</Paragraph>
          </ListElement>
          <ListElement>
            <Paragraph>3. Calculate “True Count”</Paragraph>
          </ListElement>
          <ListElement>
            <Paragraph>4. Change your bets as the true count rises</Paragraph>
          </ListElement>
        </ul>
        <Paragraph bold> 1: Assign A Value To Every Card</Paragraph>
        <Paragraph>
          The most system for counting cards is Hi-Lo. In this system low cards are counted as +1, middle value cards
          are 0, and high cards are -1.
        </Paragraph>
        <Row>
          <Row>
            <CardsBox>
              {getCards(lowCards).map((card, index) => {
                return <Card key={card._id} card={card} number={index}></Card>;
              })}
            </CardsBox>
            <Paragraph>2-6 = +1</Paragraph>
          </Row>
          <Row>
            <CardsBox>
              {getCards(middleCards).map((card, index) => {
                return <Card key={card._id} card={card} number={index}></Card>;
              })}
            </CardsBox>
            <Paragraph>7-9 = 0</Paragraph>
          </Row>
          <Row>
            <CardsBox>
              {getCards(highCards).map((card, index) => {
                return <Card key={card._id} card={card} number={index}></Card>;
              })}
            </CardsBox>
            <Paragraph>10-Ace = -1</Paragraph>
          </Row>
        </Row>
        <Paragraph bold>2: Keep a “Running Count”</Paragraph>
        <Paragraph>
          Count every card that is coming out of the shoe. For example, an ace is dealt: substract 1 from your “Running
          Count”. You should do it every card, every round until the shoe is reshuffled. Only then card counter resets
          his “Running Count” back to 0 and starts this process again.
        </Paragraph>
        <Row>
          <img alt="round-preview" src={RoundPreview} style={{ width: '600px' }} />
          <Paragraph>7 + J + 6 = 0 - 1 + 1 = 0, “Running Count” doesnt change this round</Paragraph>
        </Row>
        <Paragraph bold>3. Calculate “True Count”</Paragraph>
        <Paragraph>
          Since casinos are using multiple decks per game we have to tranlate our “Running Count” to “True Count”. We
          can do this by dividing our “Running Count” by the estimate number of decks remaining in the shoe.
        </Paragraph>
        <Paragraph>
          For example our “Running Count” is 5 and decks remaining is 2,5. In this case our “True Count” = 5/2,5 = 2.
        </Paragraph>
        <Paragraph bold>4. Change your play accordingly to your “True Count”</Paragraph>
        <Paragraph>You should use the information you have to change how you play.</Paragraph>
        <ul>
          <ListElement>
            <Paragraph>One way is to change option you choose. These are called basic strategy deviations</Paragraph>
          </ListElement>
          <ListElement>
            <Paragraph>
              Another way is changing your bet amount. If true count is high, bet more, if its low, bet less. The most
              basic strategy is to bet the lowest amount possible times “True Count”.
            </Paragraph>
          </ListElement>
        </ul>
      </TextBlock>
    </FlexBox>
  );
};

export default HowToCountCards;

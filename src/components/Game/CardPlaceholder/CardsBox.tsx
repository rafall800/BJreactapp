import { FC, useContext, useEffect } from 'react';
import { countHandValue, shuffleCards } from '../../pages/GamePage/GameManager/util';
import {
  AddPlayerButton,
  CardPlaceholder,
  CardPlaceholderBox,
  DeletePlayerButton,
  StyledCardsBox,
  HandCount,
  HandCountBox,
  HandCountPointer,
  PlayerSeat,
  Highlight,
  TopHud,
  DealtCards,
  Shoe,
  StackedCards,
  Outcome,
  SplitCardPlaceholder,
  SplitHandsBox,
  SplitCardPlaceholderBox
} from './CardsBox.styles';
import { ReactComponent as PlusIcon } from '../../../assets/icons/plus.svg';
import { ReactComponent as MinusIcon } from '../../../assets/icons/dash.svg';
import Card from '../../Card/Card';
import { BlackJackGameContext } from '../../pages/GamePage/GameManager/GameProvider';
import Test from '../../Card/Test';

const CardsBox: FC = () => {
  const {
    gameRunning,
    gameRules,
    dealSpeed,
    dealer,
    players,
    shoe,
    dealtCardsAmount,
    splitHandStage,
    setShoe,
    setPlayers,
    handleSeatAvailability,
    countDealerValue
  } = useContext(BlackJackGameContext);

  useEffect(() => {
    if (shoe.length === 0) setShoe(shuffleCards(gameRules.decksNumber));
  }, [shoe, gameRules, splitHandStage, players, setShoe, setPlayers]);

  const getHandsNumber = (): number => {
    return players.reduce((acc, curr) => {
      if (curr.seatTaken) return acc + 1;
      return acc;
    }, 1);
  };
  let handIndexCounter = -1;
  const maxCardsAmount = 8 * 52;
  return (
    <StyledCardsBox>
      <TopHud>
        <DealtCards title="Dealt cards">
          <StackedCards container="dealtCards" cardsAmount={dealtCardsAmount / maxCardsAmount} />
        </DealtCards>
        <PlayerSeat>
          <HandCountBox>
            <HandCount>{countDealerValue(dealer)}</HandCount>
          </HandCountBox>
          <CardPlaceholder dealSpeed={dealSpeed} handsNumber={getHandsNumber()} currentHand={getHandsNumber() - 1}>
            {dealer.map((card, index) => (
              <Card key={card._id} card={card} number={index} />
            ))}
          </CardPlaceholder>
        </PlayerSeat>
        <Shoe title="Cards in the shoe">
          <StackedCards container="shoe" cardsAmount={shoe.length / maxCardsAmount} />
        </Shoe>
      </TopHud>
      <CardPlaceholderBox>
        {players.map((player, index) => {
          if (player.seatTaken) handIndexCounter++;
          return (
            <PlayerSeat
              key={`player${index + 1}`}
              id={`player${index + 1}`}
              style={gameRunning ? { justifyContent: 'flex-start' } : {}}
            >
              <HandCountBox style={player.seatTaken ? { visibility: 'visible' } : { visibility: 'hidden' }}>
                <HandCount>{countHandValue(player.hand)}</HandCount>
                <HandCountPointer
                  style={player.isPlaying && !splitHandStage ? { visibility: 'visible' } : { visibility: 'hidden' }}
                />
              </HandCountBox>
              <CardPlaceholder dealSpeed={dealSpeed} handsNumber={getHandsNumber()} currentHand={handIndexCounter}>
                {player.seatTaken &&
                  player.hand.map((card, index) => <Test key={card._id} number={index} symbol={card.value} />)}
                {player.isPlaying && !splitHandStage && <Highlight handType="default" />}
                {player.outcome && <Outcome outcome={player.outcome} />}
                {!player.seatTaken && !gameRunning && (
                  <AddPlayerButton onClick={() => handleSeatAvailability(player)}>
                    <PlusIcon />
                  </AddPlayerButton>
                )}
              </CardPlaceholder>
              {player.splitHands.length > 0 && (
                <SplitHandsBox>
                  {player.splitHands.map((splitHand, splitHandIndex) => {
                    return (
                      <SplitCardPlaceholderBox key={`player${index + 1}-splitHand${splitHandIndex + 1}`}>
                        <HandCountBox>
                          <HandCount>{countHandValue(splitHand.hand)}</HandCount>
                          <HandCountPointer
                            style={splitHand.isPlaying ? { visibility: 'visible' } : { visibility: 'hidden' }}
                          />
                        </HandCountBox>
                        <SplitCardPlaceholder dealSpeed={dealSpeed}>
                          {splitHand.hand.map((card, index) => (
                            <Card key={card._id} card={card} number={index} viewBox="0 0 360 186" height="186" />
                          ))}
                          {splitHand.isPlaying && <Highlight handType="splitHand" />}
                          {splitHand.outcome && <Outcome outcome={splitHand.outcome} />}
                        </SplitCardPlaceholder>
                      </SplitCardPlaceholderBox>
                    );
                  })}
                </SplitHandsBox>
              )}
              {!gameRunning && (
                <DeletePlayerButton
                  style={!player.seatTaken || index === 2 ? { visibility: 'hidden' } : {}}
                  onClick={() => handleSeatAvailability(player)}
                >
                  <MinusIcon />
                </DeletePlayerButton>
              )}
            </PlayerSeat>
          );
        })}
      </CardPlaceholderBox>
    </StyledCardsBox>
  );
};

export default CardsBox;

{
  /* <Card key={card._id} card={card} number={index} /> */
}

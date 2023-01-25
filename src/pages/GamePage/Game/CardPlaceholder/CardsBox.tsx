import { FC, useContext, useEffect } from 'react';
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
  SplitCardPlaceholderBox,
  HandBet,
  CutCard
} from './CardsBox.styles';
import { ReactComponent as PlusIcon } from '../../../../assets/icons/plus.svg';
import { ReactComponent as MinusIcon } from '../../../../assets/icons/dash.svg';
import Card from '../../../../components/Card/Card';
import { BlackJackGameContext } from '../../../../contexts/GameProvider';
import { shuffleCards } from '../../../../utils/functions';
import { WithIdCard } from '../../../../utils/types';
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
    penetrationReached,
    setShoe,
    handleSeatAvailability,
    countDealerValue
  } = useContext(BlackJackGameContext);

  useEffect(() => {
    if (shoe.length === 0) setShoe(shuffleCards(gameRules.decksNumber));
  }, [shoe, gameRules, players, setShoe]);

  const getPlayersNumber = (): number => {
    return players.reduce((acc, curr) => {
      if (curr.seatTaken) return acc + 1;
      return acc;
    }, 1);
  };
  const getHandValueText = (hand: WithIdCard[]): string => {
    let AcesNumber = 0;
    let isAlternative = false;

    let playerValue = hand.reduce((acc, curr) => {
      if (curr.isPrivate) return acc;
      if (curr.value === 'A') {
        AcesNumber++;
        return acc;
      }
      return acc + Number(curr.value);
    }, 0);
    for (let i = 0; i < AcesNumber; i++) {
      if (playerValue + 11 > 21) playerValue = playerValue + 1;
      else {
        playerValue = playerValue + 11;
        isAlternative = true;
      }
    }
    if (isAlternative && playerValue < 21) return `${playerValue - 10}/${playerValue}`;
    return `${playerValue}`;
  };
  let handIndexCounter = -1;
  const maxCardsAmount = 8 * 52;
  return (
    <StyledCardsBox>
      <TopHud>
        <DealtCards title="Dealt cards">
          <StackedCards container="dealtCards" cardsAmount={dealtCardsAmount / maxCardsAmount} />
          {penetrationReached && <CutCard />}
        </DealtCards>
        <PlayerSeat>
          <HandCountBox>
            <HandCount>{countDealerValue(dealer)}</HandCount>
          </HandCountBox>
          <CardPlaceholder dealSpeed={dealSpeed} handsNumber={getPlayersNumber()} currentHand={getPlayersNumber() - 1}>
            {dealer.map((card, index) => (
              <Card key={card._id} number={index} card={card} />
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
              <HandBet style={player.bet > 0 ? { visibility: 'visible' } : { visibility: 'hidden' }}>
                {player.bet}
              </HandBet>
              <HandCountBox style={player.seatTaken ? { visibility: 'visible' } : { visibility: 'hidden' }}>
                <HandCount>{getHandValueText(player.hand)}</HandCount>
                <HandCountPointer
                  style={player.isPlaying && !splitHandStage ? { visibility: 'visible' } : { visibility: 'hidden' }}
                />
              </HandCountBox>
              <CardPlaceholder dealSpeed={dealSpeed} handsNumber={getPlayersNumber()} currentHand={handIndexCounter}>
                {player.seatTaken &&
                  player.hand.map((card, index) => <Card key={card._id} number={index} card={card} />)}
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
                          <HandCount>{getHandValueText(splitHand.hand)}</HandCount>
                          <HandCountPointer
                            style={splitHand.isPlaying ? { visibility: 'visible' } : { visibility: 'hidden' }}
                          />
                        </HandCountBox>
                        <SplitCardPlaceholder dealSpeed={dealSpeed}>
                          {splitHand.hand.map((card, index) => (
                            <Card key={card._id} number={index} card={card} />
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

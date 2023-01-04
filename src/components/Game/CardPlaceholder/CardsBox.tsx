import { FC, useContext } from 'react';
import Card from '../../Card/Card';
import { BlackJackGameContext } from '../GameManager/BlackJackGameContext';
import { countValue } from '../GameManager/cards';
import {
  AddPlayerButton,
  CardPlaceholder,
  CardPlaceholderBox,
  DeletePlayerButton,
  StyledCardsBox,
  HandCount,
  HandCountBox,
  HandCountPointer,
  PlayerSeat
} from './CardsBox.styles';
import { ReactComponent as PlusIcon } from '../../../assets/icons/plus.svg';
import { ReactComponent as MinusIcon } from '../../../assets/icons/dash.svg';

const CardsBox: FC = () => {
  const { dealer, players, handleSeatAvailability } = useContext(BlackJackGameContext);

  return (
    <StyledCardsBox>
      <PlayerSeat>
        <HandCountBox>
          <HandCount>{countValue(dealer)}</HandCount>
          <HandCountPointer />
        </HandCountBox>
        <CardPlaceholder>
          {dealer.map((card, index) => (
            <Card key={card._id} symbol={card.src} number={index} />
          ))}
        </CardPlaceholder>
      </PlayerSeat>
      <CardPlaceholderBox>
        {players.map((player, index) => {
          return (
            <PlayerSeat key={`player${index + 1}`} id={`player${index + 1}`}>
              {player.seatTaken && (
                <HandCountBox>
                  <HandCount>{countValue(players[index]!.hand)}</HandCount>
                  <HandCountPointer />
                </HandCountBox>
              )}
              <CardPlaceholder>
                {!player.seatTaken && (
                  <AddPlayerButton onClick={() => handleSeatAvailability(index)}>
                    <PlusIcon />
                  </AddPlayerButton>
                )}
                {player.seatTaken &&
                  player.hand.map((card, index) => <Card key={card._id} symbol={card.src} number={index} />)}
              </CardPlaceholder>
              {player.seatTaken && (
                <DeletePlayerButton
                  style={index === 2 ? { visibility: 'hidden' } : {}}
                  onClick={() => handleSeatAvailability(index)}
                >
                  <MinusIcon />
                </DeletePlayerButton>
              )}
            </PlayerSeat>
          );
        })}
      </CardPlaceholderBox>
      {/* <CardPlaceholderBox>
        <CardPlaceholder id="card1">
          {players[0]?.isPlaying && (
            <>
              <HandCountBox>
                <HandCount>{countValue(players[0]!.hand)}</HandCount>
                <HandCountPointer />
              </HandCountBox>
              {players[0]?.hand.map((card, index) => (
                <Card key={card._id} symbol={card.src} number={index} />
              ))}
            </>
          )}
        </CardPlaceholder>
        <CardPlaceholder id="card2">
          <HandCountBox>
            <HandCount>{countValue(players[1]!.hand)}</HandCount>
            <HandCountPointer />
          </HandCountBox>
          {players[1]?.isPlaying &&
            players[1]?.hand.map((card, index) => <Card key={card._id} symbol={card.src} number={index} />)}
        </CardPlaceholder>
        <CardPlaceholder id="card3">
          <HandCountBox>
            <HandCount>{countValue(players[2]!.hand)}</HandCount>
            <HandCountPointer />
          </HandCountBox>
          {players[2]?.isPlaying &&
            players[2]?.hand.map((card, index) => <Card key={card._id} symbol={card.src} number={index} />)}
        </CardPlaceholder>
        <CardPlaceholder id="card4">
          <HandCountBox>
            <HandCount>{countValue(players[3]!.hand)}</HandCount>
            <HandCountPointer />
          </HandCountBox>
          {players[3]?.isPlaying &&
            players[3]?.hand.map((card, index) => <Card key={card._id} symbol={card.src} number={index} />)}
        </CardPlaceholder>
        <CardPlaceholder id="card5">
          <HandCountBox>
            <HandCount>{countValue(players[4]!.hand)}</HandCount>
            <HandCountPointer />
          </HandCountBox>
          {players[4]?.isPlaying &&
            players[4]?.hand.map((card, index) => <Card key={card._id} symbol={card.src} number={index} />)}
        </CardPlaceholder>
      </CardPlaceholderBox> */}
    </StyledCardsBox>
  );
};

export default CardsBox;

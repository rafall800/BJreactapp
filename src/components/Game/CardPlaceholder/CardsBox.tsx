import { FC, useContext } from 'react';
import { countPlayerValue } from '../../pages/GamePage/GameManager/util';
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
  Shoe
} from './CardsBox.styles';
import { ReactComponent as PlusIcon } from '../../../assets/icons/plus.svg';
import { ReactComponent as MinusIcon } from '../../../assets/icons/dash.svg';
import Cardv2 from '../../Card/Card';
import { BlackJackGameContext } from '../../pages/GamePage/GameManager/GameProvider';

const CardsBox: FC = () => {
  const { gameRunning, dealSpeed, dealer, players, handleSeatAvailability, countDealerValue } =
    useContext(BlackJackGameContext);

  const getHandsNumber = (): number => {
    return players.reduce((acc, curr) => {
      if (curr.seatTaken) return acc + 1;
      return acc;
    }, 1);
  };
  let handIndexCounter = -1;
  return (
    <StyledCardsBox>
      <TopHud>
        <DealtCards />
        <PlayerSeat>
          <HandCountBox>
            <HandCount>{countDealerValue(dealer)}</HandCount>
          </HandCountBox>
          <CardPlaceholder dealSpeed={dealSpeed} handsNumber={getHandsNumber()} currentHand={getHandsNumber() - 1}>
            {dealer.map((card, index) => (
              <Cardv2 key={card._id} card={card} number={index} />
            ))}
          </CardPlaceholder>
        </PlayerSeat>
        <Shoe />
      </TopHud>
      <CardPlaceholderBox>
        {players.map((player, index) => {
          if (player.seatTaken) handIndexCounter++;
          return (
            <PlayerSeat
              key={`player${index + 1}`}
              id={`player${index + 1}`}
              style={gameRunning ? { justifyContent: 'flex-end' } : {}}
            >
              {player.seatTaken && (
                <HandCountBox>
                  <HandCount>{countPlayerValue(player.hand)}</HandCount>
                  <HandCountPointer style={player.isPlaying ? { visibility: 'visible' } : { visibility: 'hidden' }} />
                </HandCountBox>
              )}
              <CardPlaceholder dealSpeed={dealSpeed} handsNumber={getHandsNumber()} currentHand={handIndexCounter}>
                {player.seatTaken &&
                  player.hand.map((card, index) => <Cardv2 key={card._id} card={card} number={index} />)}
                {player.isPlaying && <Highlight />}
                {!player.seatTaken && !gameRunning && (
                  <AddPlayerButton onClick={() => handleSeatAvailability(player)}>
                    <PlusIcon />
                  </AddPlayerButton>
                )}
              </CardPlaceholder>
              {player.seatTaken && !gameRunning && (
                <DeletePlayerButton
                  style={index === 2 ? { visibility: 'hidden' } : {}}
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

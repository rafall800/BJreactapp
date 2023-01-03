import { FC, useContext } from 'react';
import Card from '../../Card/Card';
import { BlackJackGameContext } from '../GameManager/BlackJackGameContext';
import { countValue } from '../GameManager/cards';
import {
  AddPlayerButton,
  CardPlaceholder,
  CardPlaceholderBox,
  FlexBox,
  HandCount,
  HandCountBox,
  HandCountPointer
} from './CardsBox.styles';
import { ReactComponent as PlusIcon } from '../../../assets/icons/plus.svg';

const CardsBox: FC = () => {
  const { dealer, players, addPlayer } = useContext(BlackJackGameContext);
  return (
    <FlexBox>
      <CardPlaceholder>
        <HandCountBox>
          <HandCount>{countValue(dealer)}</HandCount>
          <HandCountPointer />
        </HandCountBox>
        {dealer.map((card, index) => (
          <Card key={card._id} symbol={card.src} number={index} />
        ))}
      </CardPlaceholder>
      <CardPlaceholderBox>
        {Array(5)
          .fill(<></>)
          .map((_card, index) => {
            return (
              <CardPlaceholder key={`card${index + 1}`} id={`card${index + 1}`}>
                {!players[index]?.isPlaying && (
                  <AddPlayerButton onClick={() => addPlayer(index)}>
                    <PlusIcon />
                  </AddPlayerButton>
                )}
                {players[index]?.isPlaying && (
                  <>
                    <HandCountBox>
                      <HandCount>{countValue(players[index]!.hand)}</HandCount>
                      <HandCountPointer />
                    </HandCountBox>
                    {players[index]?.hand.map((card, index) => (
                      <Card key={card._id} symbol={card.src} number={index} />
                    ))}
                  </>
                )}
              </CardPlaceholder>
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
    </FlexBox>
  );
};

export default CardsBox;

import { FC, useContext } from 'react';
import { BlackJackGameContext } from '../GameManager/BlackJackGameContext';
import { countValue } from '../GameManager/cards';
import {
  CardPlaceholder,
  CardPlaceholderBox,
  FlexBox,
  HandCount,
  HandCountBox,
  HandCountPointer
} from './CardsBox.styles';

const CardsBox: FC = () => {
  const { dealer } = useContext(BlackJackGameContext);
  return (
    <FlexBox>
      <CardPlaceholder>
        <HandCountBox>
          <HandCount>{countValue(dealer)}</HandCount>
          <HandCountPointer />
        </HandCountBox>
        {dealer.map((card) => (
          <img key={card._id} src={require(card.src).default} alt="card" />
        ))}
      </CardPlaceholder>
      <CardPlaceholderBox>
        <CardPlaceholder id="card1">
          <HandCountBox>
            <HandCount>17</HandCount>
            <HandCountPointer />
          </HandCountBox>
        </CardPlaceholder>
        <CardPlaceholder id="card2">
          <HandCountBox>
            <HandCount>17</HandCount>
            <HandCountPointer />
          </HandCountBox>
        </CardPlaceholder>
        <CardPlaceholder id="card3">
          <HandCountBox>
            <HandCount>17</HandCount>
            <HandCountPointer />
          </HandCountBox>
        </CardPlaceholder>
        <CardPlaceholder id="card4">
          <HandCountBox>
            <HandCount>17</HandCount>
            <HandCountPointer />
          </HandCountBox>
        </CardPlaceholder>
        <CardPlaceholder id="card5">
          <HandCountBox>
            <HandCount>17</HandCount>
            <HandCountPointer />
          </HandCountBox>
        </CardPlaceholder>
      </CardPlaceholderBox>
    </FlexBox>
  );
};

export default CardsBox;

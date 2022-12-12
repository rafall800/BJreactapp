import { FC } from 'react';
import {
  CardPlaceholder,
  CardPlaceholderBox,
  FlexBox,
  HandCount,
  HandCountBox,
  HandCountPointer
} from './CardsBox.styles';

const CardsBox: FC = () => {
  return (
    <FlexBox>
      <CardPlaceholder>
        <HandCountBox>
          <HandCount>17</HandCount>
          <HandCountPointer />
        </HandCountBox>
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

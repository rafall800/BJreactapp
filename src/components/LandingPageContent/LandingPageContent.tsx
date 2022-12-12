import { FC } from 'react';
import { whatIsCardCounting } from '../content';
import { Header2 } from '../textStyles/Header2.styles';
import { Paragraph } from '../textStyles/Paragrapsh.styles';
import { Title } from '../textStyles/Title.styles';
import {
  ListElement,
  PreviewBlock,
  PreviewItem,
  StyledContent,
  TextBlock1,
  TextBlock2
} from './LandingPageContent.styles';
import image from '../../assets/testAsset.png';
import Button from '../Button/Button';

const LandingPageContent: FC = () => {
  return (
    <StyledContent>
      <TextBlock1>
        <Title>What is card counting?</Title>
        <Paragraph>{whatIsCardCounting}</Paragraph>
      </TextBlock1>
      <TextBlock2>
        <Title>How to count cards?</Title>
        <div>
          <Paragraph>To count cards you need to:</Paragraph>
          <ul>
            <ListElement>
              <Paragraph>keep track of running/true count</Paragraph>
            </ListElement>
            <ListElement>
              <Paragraph>apply perfect basic strategy</Paragraph>
            </ListElement>
            <ListElement>
              <Paragraph>deftly change your bets</Paragraph>
            </ListElement>
            <ListElement>
              <Paragraph>use playing deviations to basic strategy</Paragraph>
            </ListElement>
          </ul>
        </div>
        <Button variant="primary">start course</Button>
      </TextBlock2>
      <PreviewBlock>
        <Title>How does it work?</Title>
        <PreviewItem>
          <Header2>practice counting</Header2>
          <img alt="preview" src={image} loading="lazy" />
        </PreviewItem>
        <PreviewItem id="reverse">
          <Header2>learn basic strategy</Header2>
          <img alt="preview" src={image} loading="lazy" />
        </PreviewItem>
        <PreviewItem>
          <Header2>play blackjack</Header2>
          <img alt="preview" src={image} loading="lazy" />
        </PreviewItem>
      </PreviewBlock>
    </StyledContent>
  );
};

export default LandingPageContent;

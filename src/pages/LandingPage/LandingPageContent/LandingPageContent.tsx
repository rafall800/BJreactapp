import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import { Header2 } from '../../../components/textStyles/Header2.styles';
import { Paragraph } from '../../../components/textStyles/Paragrapsh.styles';
import { Title } from '../../../components/textStyles/Title.styles';
import { whatIsCardCounting } from '../../../utils/content';
import RoutesEnum from '../../../utils/routes';
import {
  StyledContent,
  TextBlock1,
  TextBlock2,
  ListElement,
  PreviewBlock,
  PreviewItem
} from './LandingPageContent.styles';
import Hard from '../../../assets/charts/BS/Hard.png';
import CardCountingPreview from '../../../assets/previews/CountingCards.png';
import BJGamePreview from '../../../assets/previews/BJGamePreview.png';

const LandingPageContent: FC = () => {
  const navigate = useNavigate();
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
        <Button variant="primary" onClick={() => navigate(RoutesEnum.ArticlesPage)}>
          learn
        </Button>
      </TextBlock2>
      <PreviewBlock>
        <Title>How does it look?</Title>
        <PreviewItem>
          <Header2>practice counting</Header2>
          <img alt="preview" src={CardCountingPreview} loading="lazy" />
        </PreviewItem>
        <PreviewItem id="reverse">
          <Header2>learn basic strategy</Header2>
          <img alt="preview" src={Hard} loading="lazy" />
        </PreviewItem>
        <PreviewItem>
          <Header2>play blackjack</Header2>
          <img alt="preview" src={BJGamePreview} loading="lazy" />
        </PreviewItem>
      </PreviewBlock>
    </StyledContent>
  );
};

export default LandingPageContent;

import { FC } from 'react';
import { ListElement } from '../../../LandingPageContent/LandingPageContent.styles';
import { Header3 } from '../../../textStyles/Header3.styles';
import { Paragraph } from '../../../textStyles/Paragrapsh.styles';
import { FlexBox, ParagraphsRow, TextBlock } from './HowToPlay.styles';

const HowToPlay: FC = () => {
  return (
    <FlexBox>
      <TextBlock>
        <Header3>The Blackjack Game's Goal</Header3>
        <Paragraph>
          Take the dealer down. It's a common fallacy that the goal of the game of blackjack is to beat the dealer, but
          that couldn't be further from the truth.
        </Paragraph>
        <Paragraph bold>How can one defeat the dealer?</Paragraph>
        <ul>
          <ListElement>
            <Paragraph>Through drawing a hand value greater than the dealer's hand value</Paragraph>
          </ListElement>
          <ListElement>
            <Paragraph>If the dealer draws a hand with a value higher than 21.</Paragraph>
          </ListElement>
          <ListElement>
            <Paragraph>
              Through drawing a hand value of 21 after receiving your initial two cards, when the dealer does not.
            </Paragraph>
          </ListElement>
        </ul>
        <Paragraph bold>How can dealer defeat you?</Paragraph>
        <ul>
          <ListElement>
            <Paragraph>You draw hand value over 21.</Paragraph>
          </ListElement>
          <ListElement>
            <Paragraph>If the dealer draws a hand with a value higher than yours.</Paragraph>
          </ListElement>
        </ul>
        <Paragraph>
          It's also crucial to remember that the hands of the other players at the table have no inpact on your hands
          outcome.
        </Paragraph>
      </TextBlock>
      <TextBlock>
        <Header3>How is the total value of a hand determined?</Header3>
        <Paragraph>Blackjack is played with a 52-card standard deck, and suits are irrelevant.</Paragraph>
        <ul>
          <ListElement>
            <Paragraph>
              2 through 10 are taken at face value, with a 3 representing three and a 10 representing ten.
            </Paragraph>
          </ListElement>
          <ListElement>
            <Paragraph>The face cards J, Q, and K total 10.</Paragraph>
          </ListElement>
          <ListElement>
            <Paragraph>Depending on which value helps the hand the most, an ace can be a 1 or an 11.</Paragraph>
          </ListElement>
        </ul>
      </TextBlock>
      <TextBlock>
        <Header3>Playing Blackjack</Header3>
        <Paragraph>
          There are a variety of rules and deck sizes available in blackjack games. A six-deck or eight-deck "shoe" is
          used in the most common blackjack game. In this simulator you can choose either 6, 7 or 8 deck shoe to be
          played. A blackjack game can be simplified to these steps:
        </Paragraph>
        <ul>
          <ListElement>
            <Paragraph>Each player places a bet.</Paragraph>
          </ListElement>
          <ListElement>
            <Paragraph>The dealer hands out cards to the players.</Paragraph>
          </ListElement>
          <ListElement>
            <Paragraph>The player chooses how to play each hand.</Paragraph>
          </ListElement>
          <ListElement>
            <Paragraph>The dealer plays hand.</Paragraph>
          </ListElement>
          <ListElement>
            <Paragraph>Each hand outcome and payout is determined.</Paragraph>
          </ListElement>
        </ul>
        <Paragraph bold>The dealer hands out cards to the players.</Paragraph>
        <Paragraph>
          After every player placed a bet, dealer will deal 1 card, face up, to each player, ending on himself. Then the
          dealer goes through the same procedure but his second card will be dealt face down. Every player should end up
          with two face up cards and the dealer with one face up one face down card.
        </Paragraph>
        <Paragraph bold>The player chooses how to play each hand.</Paragraph>
        <Paragraph>
          The player on the dealer's left will be the first player to play their hand. Prior to playing your hand, sum
          up the card values to create a hand total that ranges from 4 to 21. You've been dealt a blackjack if your
          first two cards are an Ace and a card with a value of 10. If the dealer doesn't also have a Blackjack, those
          are paid 3 to 2 (or 1.5 times your bet) right away without having to wait for the rest of the round. You
          wouldn't win anything if the dealer also had a blackjack, but you also wouldn't lose your initial bet. We
          refer to this as a "push." Your dealer will point to each player in turn and wait for you to determine how you
          want to play your hand if neither YOU nor the dealer has a blackjack. You have five options for how to play
          your hand:
        </Paragraph>
        <div>
          <ParagraphsRow>
            <Paragraph bold>Stand</Paragraph>
            <Paragraph> - You can stand, and the dealer will move on to the next player.</Paragraph>
          </ParagraphsRow>
          <ParagraphsRow>
            <Paragraph bold>Hit</Paragraph>
            <Paragraph>
              - The dealer will deal you one additional card. You can take as many cards as you want, with the exception
              of exceeding the 21 total.
            </Paragraph>
          </ParagraphsRow>
          <ParagraphsRow>
            <Paragraph bold>Double Down</Paragraph>
            <Paragraph>
              - You can double your initial bet, and the dealer will only deal you one additional card.
            </Paragraph>
          </ParagraphsRow>
          <ParagraphsRow>
            <Paragraph bold>Split</Paragraph>
            <Paragraph>
              - If you are dealt a pair (two cards of the same value), you have the option to place a second bet, and
              the dealer will divide the two cards in such a way that each card becomes the first card on two new hands.
              Face cards are also subject to this. Even though they are not actually a pair, a hand with a King and a
              Jack can be split because they both have the same value.
            </Paragraph>
          </ParagraphsRow>
          <ParagraphsRow>
            <Paragraph bold>Surrender</Paragraph>
            <Paragraph>
              - If you don't like your first hand, you can give it up for half your original bet back.
            </Paragraph>
          </ParagraphsRow>
        </div>
        <Paragraph bold>The dealer plays hand.</Paragraph>
        <Paragraph>
          It's time for the dealer to play their hand if you didn't surrender and your hand hasn't busted. First, the
          dealer will add up their two-card hand by flipping over their "hole card", which is the card with its face
          down. The dealer will automatically stand if their hand total is 17 or higher. The dealer will accept
          additional hit cards if their hand total is less than 17. The dealer is unable to double, split, or surrender,
          and unlike the player, they have no control over how they play their hand. Every time, the Dealer must play
          their hand the same way. The only exception is when the dealer has a 17 made up of a six and an ace. This is
          known as a "soft 17," and depending on the casino, the dealer may hit this hand because it can also count as a
          7 (because an ace has a flexible value), giving the dealer more opportunities to get a better hand than 17. If
          the dealer stands on all 17s, the casino has a bigger advantage because of this.
        </Paragraph>
        <Paragraph bold>Each hand outcome and payout is determined.</Paragraph>
        <Paragraph>
          If the dealer busts, each hand that is still in play will receive two times its bet back. If the dealer draws
          hand of value between 17 and 21 it's a straightforward contest to determine who has the higher hand if your
          hand is still in play. They take your bet away if the dealer has the better hand. You receive two times your
          hands bet if you have the better hand. A "push" occurs when both you and the dealer have the same hand total,
          and you reveive your hands bet back.
        </Paragraph>
      </TextBlock>
      <TextBlock>
        <Header3>Variations in the Blackjack Rules</Header3>
        <Paragraph>
          There are a lot of different rules and conditions that can change how the game of Blackjack is played. To put
          it another way, not all blackjack games are created equal in terms of their favorable odds and player
          advantages. A summary of some of the rules that will affect the game's odds is provided here.
        </Paragraph>
        <Paragraph bold>Doubling After Splitting (DAS)</Paragraph>
        <Paragraph>
          Simply put, this means that you can double down on a split hand. This rule is actually advantageous to the
          player and is accepted by most casinos. This rule is applied in this simulator.
        </Paragraph>
        <Paragraph bold>Re-Splitting Aces (RSA)</Paragraph>
        <Paragraph>
          After splitting a pair of aces, some casinos let players re-split their aces. This means that if you split a
          pair of aces and get another ace as your next card, you can split to a third hand for a maximum of four hands.
          Since the player has the most power with the ace, if the casino allows RSA, it is in the player's best
          interest. In most cases, even if the casino offers RSA, you can only take one card for each ace. After
          splitting an ace, you can't double or take any more cards. This is due to casinos' efforts to limit situations
          in which the player has an advantage, knowing that the Ace is the most powerful card. In this simulator
          splitting aces works as splitting any other pair.
        </Paragraph>
        <Paragraph bold>Early Surrender</Paragraph>
        <Paragraph>
          Since the 1970s, casinos in the United States have not enforced this outdated rule. The Early Surrender rule
          is the same as usual, but you can surrender before the dealer checks for a blackjack. When it was still
          around, it was very good for the player. Without counting cards, a good basic strategy player could have a
          small advantage. Because of that, it died out. This simulator does not support Early Surrender.
        </Paragraph>
        <Paragraph bold>Deck/Shoe Penetration (PEN)</Paragraph>
        <Paragraph>
          The percentage of cards actually dealt out of the shoe. In most cases, a cut card is inserted toward the back
          of the cards that will be dealt into the shoe. During the course of the game, when the cut card is dealt out,
          it informs the dealer that the shoe is running out of cards, prompting the dealer to shuffle the cards and
          open a new shoe. Although a quarter deck of cards is sufficient to complete a round of Blackjack, the majority
          of casinos will cut off much more than that (two decks) to limit a card counter's profitability. The depth of
          penetration can make or break a blackjack game for a card counter. This simulator has set PEN at 75%.
        </Paragraph>
      </TextBlock>
    </FlexBox>
  );
};

export default HowToPlay;

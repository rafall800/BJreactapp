import { FC } from 'react';
import useCollapse from 'react-collapsed';
import { TableTab } from '../../../../textStyles/TableTab.styles';
import {
  StyledCollapsible,
  CollapsibleHeader,
  CollapsibleTitle,
  CollapsibleContent,
  DealOutcome
} from './Cllapsible.styles';
import { ReactComponent as ChevronDown } from '../../../../../assets/icons/chevron-down.svg';
import { ReactComponent as ChevronUp } from '../../../../../assets/icons/chevron-up.svg';
import { ReactComponent as XIcon } from '../../../../../assets/icons/x-icon.svg';
import { ReactComponent as Check } from '../../../../../assets/icons/check.svg';
import { GameHand } from '../../../../pages/GamePage/GameManager/useBlackJackGameState';
import CollapsibleHand from './CollapsibleHand';

interface Props {
  deal: GameHand[];
  dealNumber: number;
  open?: boolean;
}
const CollapisbleDeal: FC<Props> = ({ deal, dealNumber, open }) => {
  const config = {
    duration: 400,
    defaultExpanded: open
  };
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse(config);
  const dealBetOutcome = deal.reduce((acc, curr) => {
    return acc + curr.betOutcome;
  }, 0);
  return (
    <StyledCollapsible>
      <CollapsibleHeader {...getToggleProps()}>
        <CollapsibleTitle>
          {isExpanded ? <ChevronUp /> : <ChevronDown />}

          <TableTab>{`Deal ${dealNumber}`}</TableTab>
        </CollapsibleTitle>
        <DealOutcome>
          {dealBetOutcome >= 0 ? <Check /> : <XIcon />}
          {dealBetOutcome >= 0 ? `+${dealBetOutcome}` : `-${dealBetOutcome}`}
        </DealOutcome>
      </CollapsibleHeader>
      <CollapsibleContent {...getCollapseProps()}>
        {deal
          .map((hand, index) => {
            return <CollapsibleHand key={`hand${index}`} hand={hand} open={index === 0} />;
          })
          .reverse()}
      </CollapsibleContent>
    </StyledCollapsible>
  );
};

export default CollapisbleDeal;

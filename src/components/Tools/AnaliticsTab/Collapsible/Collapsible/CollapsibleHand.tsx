import { FC } from 'react';
import { GameHand } from '../../../../pages/GamePage/GameManager/useBlackJackGameState';
import { TableTab } from '../../../../textStyles/TableTab.styles';
import { StyledCollapsible, CollapsibleTitle, CollapsibleContent, CollapsibleHeader } from './Cllapsible.styles';
import { ReactComponent as ChevronDown } from '../../../../../assets/icons/chevron-down.svg';
import { ReactComponent as ChevronUp } from '../../../../../assets/icons/chevron-up.svg';
import Table from '../Table/Table';
import useCollapse from 'react-collapsed';

interface Props {
  hand: GameHand;
  open: boolean;
}

const CollapsibleHand: FC<Props> = ({ hand, open }) => {
  const config = {
    duration: 400,
    defaultExpanded: open
  };
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse(config);

  return (
    <StyledCollapsible>
      <CollapsibleHeader {...getToggleProps()} isNested>
        <CollapsibleTitle>
          {isExpanded ? <ChevronUp /> : <ChevronDown />}
          <TableTab>{hand.handName}</TableTab>
        </CollapsibleTitle>
      </CollapsibleHeader>
      <CollapsibleContent {...getCollapseProps()} isNested>
        <Table moves={hand.handData} />
      </CollapsibleContent>
    </StyledCollapsible>
  );
};

export default CollapsibleHand;

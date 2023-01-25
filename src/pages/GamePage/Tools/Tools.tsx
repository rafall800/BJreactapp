import { FC } from 'react';
import { Header1 } from '../../../components/textStyles/Header1.styles';
import AnaliticsTab from './AnaliticsTab/AnaliticsTab';
import StatisticsTab from './StatisticsTab/StatisticsTab';
import Tabs from './Tabs/Tabs';
import { StyledTools } from './Tools.styles';

const Tools: FC = () => {
  return (
    <StyledTools>
      <Header1>tools</Header1>
      <span />
      <Tabs>
        <AnaliticsTab title="analitics" />
        <StatisticsTab title="statistics" />
      </Tabs>
    </StyledTools>
  );
};

export default Tools;

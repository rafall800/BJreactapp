import { FC, useContext, useState } from 'react';
import { BlackJackGameContext } from '../../pages/GamePage/GameManager/GameProvider';
import { initialData } from '../../pages/GamePage/GameManager/util';
import { Header3 } from '../../textStyles/Header3.styles';
import {
  ButtonWrapper,
  Chart,
  ChartLegend,
  ChartsBox,
  ColoredSquare,
  Legend,
  LegendElement,
  StyledStatisticsTab
} from './StatisticsTab.styles';
import SoftDChart from '../../../assets/charts/Deviations/Soft-D.png';
import HardDChart from '../../../assets/charts/Deviations/Hard-D.png';
import PairsDChart from '../../../assets/charts/Deviations/Splits-D.png';
import SurrDChart from '../../../assets/charts/Deviations/Surr-D.png';
import SoftChart from '../../../assets/charts/BS/Soft.png';
import HardChart from '../../../assets/charts/BS/Hard.png';
import PairsChart from '../../../assets/charts/BS/Splits.png';
import SurrChart from '../../../assets/charts/BS/Surr.png';
import Backdrop from '../../Backdrop/Backdrop';
import { TableTab } from '../../textStyles/TableTab.styles';
import Button from '../../Button/Button';

interface StatisticsTabProps {
  title: string;
}

const StatisticsTab: FC<StatisticsTabProps> = () => {
  const [openBackdrop, setOpenBackdrop] = useState<boolean>(false);
  const [chartType, setChartType] = useState<boolean>(false);
  const [imageToShow, setImageToShow] = useState<string>('');
  const handleOpenImage = (image: string) => {
    setOpenBackdrop(true);
    setImageToShow(image);
  };
  const handleCloseImage = () => {
    setOpenBackdrop(false);
  };

  const { runningCount, balance, gameData, shoe } = useContext(BlackJackGameContext);
  const decksLeft = shoe.length / 52;
  const trueCount = Math.round((runningCount / decksLeft) * 100) / 100;
  let movesNumber: number = 0;
  let correctMovesNumber: number = 0;
  gameData.forEach((deal) => {
    deal.forEach((hand) => {
      hand.handData.forEach((move) => {
        movesNumber++;
        if (move.bestOption === move.playerOption) correctMovesNumber++;
      });
    });
  });
  let performance;
  movesNumber === 0 ? (performance = 0) : (performance = Math.round((correctMovesNumber / movesNumber) * 100) / 100);
  return (
    <StyledStatisticsTab>
      <table>
        <thead>
          <tr>
            <th title="Difference between current balance and initial balance">Balance:</th>
            <th title="Correct decisions amount divided by overall moves amount">Performance:</th>
            <th>Running Count:</th>
            <th title="Cards left in the shoe">Cards Left:</th>
            <th title="Running count divided by cards left in the shoe">True Count:</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>{(balance - initialData.balance > 0 ? '+' : '') + `${balance - initialData.balance}`}</th>
            <th>{performance}</th>
            <th>{runningCount}</th>
            <th>{`${shoe.length} (~${Math.round(decksLeft)} decks)`}</th>
            <th>{trueCount}</th>
          </tr>
        </tbody>
      </table>
      <ChartsBox>
        <Chart>
          <Header3>pairs chart</Header3>
          <img
            alt="pairs chart"
            src={chartType ? PairsDChart : PairsChart}
            loading="lazy"
            onClick={() => handleOpenImage(chartType ? PairsDChart : PairsChart)}
          />
        </Chart>
        <Chart>
          <Header3>soft values chart</Header3>
          <img
            alt="soft values chart"
            src={chartType ? SoftDChart : SoftChart}
            loading="lazy"
            onClick={() => handleOpenImage(chartType ? SoftDChart : SoftChart)}
          />
        </Chart>
        <Chart>
          <Header3>surrender chart</Header3>
          <img
            alt="surrender chart"
            src={chartType ? SurrDChart : SurrChart}
            loading="lazy"
            onClick={() => handleOpenImage(chartType ? SurrDChart : SurrChart)}
          />
        </Chart>
        <Chart>
          <Header3>hard values chart</Header3>
          <img
            alt="hard values chart"
            src={chartType ? HardDChart : HardChart}
            loading="lazy"
            onClick={() => handleOpenImage(chartType ? HardDChart : HardChart)}
          />
        </Chart>
      </ChartsBox>
      <ButtonWrapper isActive={chartType}>
        <Button variant="primary" onClick={() => setChartType((prevValue) => !prevValue)}>
          switch charts
        </Button>
      </ButtonWrapper>
      <Legend>
        <ChartLegend>
          <LegendElement>
            <ColoredSquare color={'#00b050'} />
            <TableTab>Y - Split</TableTab>
          </LegendElement>
          <LegendElement>
            <ColoredSquare color={'#fff'} />
            <TableTab>N - Don't split</TableTab>
          </LegendElement>
        </ChartLegend>
        <ChartLegend>
          <LegendElement>
            <ColoredSquare color={'#ffc000'} />
            <TableTab>S - Stay</TableTab>
          </LegendElement>{' '}
          <LegendElement>
            <ColoredSquare color={'#9bc2e6'} />
            <TableTab>Ds - Double if possible, else stay</TableTab>
          </LegendElement>
        </ChartLegend>
        <ChartLegend>
          <LegendElement>
            <ColoredSquare color={'#00b050'} />
            <TableTab>D - Double if possible, else hit</TableTab>
          </LegendElement>
          <LegendElement>
            <ColoredSquare color={'#fff'} />
            <TableTab>H - Hit</TableTab>
          </LegendElement>
        </ChartLegend>
        <LegendElement>
          <ColoredSquare color={'#00b050'} />
          <TableTab>SUR - Surrender if possible</TableTab>
        </LegendElement>
      </Legend>
      {chartType && (
        <>
          <LegendElement>
            <ColoredSquare color={'#ffff00'} />
            <TableTab>Examples: </TableTab>
          </LegendElement>
          <Legend style={{ gap: 80 }}>
            <TableTab>{'3+ S - If true count is 3 or more Stay else use BS'} </TableTab>
            <TableTab>{'-1- H - If running count is -1 or less Hit else use BS'} </TableTab>
          </Legend>
        </>
      )}
      <Backdrop open={openBackdrop}>
        <img onClick={handleCloseImage} src={imageToShow} alt="Bigger chart" />
      </Backdrop>
    </StyledStatisticsTab>
  );
};

export default StatisticsTab;

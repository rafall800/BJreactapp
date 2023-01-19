import { FC, useContext, useState } from 'react';
import { BlackJackGameContext } from '../../pages/GamePage/GameManager/GameProvider';
import { initialData } from '../../pages/GamePage/GameManager/util';
import { Header3 } from '../../textStyles/Header3.styles';
import {
  Chart,
  ChartLegend,
  ChartsBox,
  ColoredSquare,
  Legend,
  LegendElement,
  StyledStatisticsTab
} from './StatisticsTab.styles';
import SoftChart from '../../../assets/charts/Soft.png';
import HardChart from '../../../assets/charts/Hard.png';
import PairsChart from '../../../assets/charts/Pairs.png';
import SurChart from '../../../assets/charts/Sur.png';
import Backdrop from '../../Backdrop/Backdrop';
import { TableTab } from '../../textStyles/TableTab.styles';

interface StatisticsTabProps {
  title: string;
}

const StatisticsTab: FC<StatisticsTabProps> = () => {
  const [openBackdrop, setOpenBackdrop] = useState<boolean>(false);
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
          <Header3>hard values chart</Header3>
          <img alt="hard values chart" src={HardChart} loading="lazy" onClick={() => handleOpenImage(HardChart)} />
        </Chart>
        <Chart>
          <Header3>soft values chart</Header3>
          <img alt="soft values chart" src={SoftChart} loading="lazy" onClick={() => handleOpenImage(SoftChart)} />
        </Chart>
        <Chart>
          <Header3>pairs chart</Header3>
          <img alt="pairs chart" src={PairsChart} loading="lazy" onClick={() => handleOpenImage(PairsChart)} />
        </Chart>
        <Chart>
          <Header3>surrender chart</Header3>
          <img alt="surrender chart" src={SurChart} loading="lazy" onClick={() => handleOpenImage(SurChart)} />
        </Chart>
      </ChartsBox>
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
      <LegendElement>
        <ColoredSquare color={'#ffff00'} />
        <TableTab>Examples: </TableTab>
      </LegendElement>
      <Legend>
        <ChartLegend>
          <TableTab>{'H/+3->S - If true count is 3 or more Stay else Hit '} </TableTab>
          <TableTab>{'S/-0->H - If running count is negative Hit else Stay'} </TableTab>
        </ChartLegend>
        <ChartLegend>
          <TableTab>{'S/-1->H - If true count is 1 or less Hit else Stay '} </TableTab>
          <TableTab>{'+1->SUR - If true count is 1 or more Surrender'} </TableTab>
        </ChartLegend>
      </Legend>
      <Backdrop open={openBackdrop}>
        <img onClick={handleCloseImage} src={imageToShow} alt="Bigger chart" />
      </Backdrop>
    </StyledStatisticsTab>
  );
};

export default StatisticsTab;

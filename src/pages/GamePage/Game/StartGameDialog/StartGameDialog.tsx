import { FC, useContext } from 'react';
import { useNavigate } from 'react-router';
import Button from '../../../../components/Button/Button';
import CustomDialog from '../../../../components/CustomDialog/CustomDialog';
import CustomInput from '../../../../components/CustomInput/CustomInput';
import { BlackJackGameContext } from '../../../../contexts/GameProvider';
import { useForm } from '../../../../hooks/UseForm';
import RoutesEnum from '../../../../utils/routes';
import { ButtonBox, CheckboxBox } from './StartGameDialog.styles';

export interface StartGameDialogForm {
  balance: number;
  decksNumber: number;
  soft17Rule: boolean;
}

const StartGameDialog: FC = () => {
  const navigate = useNavigate();
  const { balance, gameRules, setGameRules, setBalance, startGame, handleSetupPlayers, setPlayers } =
    useContext(BlackJackGameContext);

  const { handleSubmit, handleChange, form, errors } = useForm<StartGameDialogForm>({
    validations: {
      balance: [
        {
          isValid: (balance) => balance >= 1000,
          message: 'Needs to be over or equal 1000!'
        }
      ],
      decksNumber: [
        {
          isValid: (decks) => Number(decks) === 6 || Number(decks) === 8,
          message: 'Needs to be equal to 6 or 8!'
        }
      ]
    },
    onSubmit: () => {
      setPlayers([
        {
          seatTaken: false,
          isPlaying: false,
          hand: [],
          bet: 0,
          outcome: undefined,
          betOutcome: 0,
          canSplit: false,
          canDoubledown: true,
          canGetBlackJack: true,
          canSurrender: true,
          splitHands: [],
          playerName: 'player1'
        },
        {
          seatTaken: false,
          isPlaying: false,
          hand: [],
          bet: 0,
          betOutcome: 0,
          outcome: undefined,
          canSplit: false,
          canDoubledown: true,
          canGetBlackJack: true,
          canSurrender: true,
          splitHands: [],
          playerName: 'player2'
        },
        {
          seatTaken: true,
          isPlaying: false,
          hand: [],
          bet: 0,
          betOutcome: 0,
          outcome: undefined,
          canSplit: false,
          canDoubledown: true,
          canGetBlackJack: true,
          canSurrender: true,
          splitHands: [],
          playerName: 'player3'
        },
        {
          seatTaken: false,
          isPlaying: false,
          hand: [],
          bet: 0,
          betOutcome: 0,
          outcome: undefined,
          canSplit: false,
          canDoubledown: true,
          canGetBlackJack: true,
          canSurrender: true,
          splitHands: [],
          playerName: 'player4'
        },
        {
          seatTaken: false,
          isPlaying: false,
          hand: [],
          bet: 0,
          betOutcome: 0,
          outcome: undefined,
          canSplit: false,
          canDoubledown: true,
          canGetBlackJack: true,
          canSurrender: true,
          splitHands: [],
          playerName: 'player5'
        }
      ]);
      setBalance(form.balance);
      gameRules.decksNumber = Number(form.decksNumber);
      gameRules.soft17 = form.soft17Rule;
      setGameRules({ ...gameRules });
      startGame();
      handleSetupPlayers();
    },
    initialValues: {
      balance: balance,
      soft17Rule: gameRules.soft17,
      decksNumber: gameRules.decksNumber
    }
  });
  return (
    <CustomDialog open={true}>
      <form onSubmit={handleSubmit}>
        <CustomInput
          id="balance"
          label="Set your balance"
          type="number"
          value={form.balance}
          errorMessage={errors.balance}
          onChange={handleChange}
        />
        <CustomInput
          id="decksNumber"
          label="Set decks number"
          type="number"
          value={form.decksNumber}
          errorMessage={errors.decksNumber}
          onChange={handleChange}
        />
        <CheckboxBox>
          <label htmlFor="soft17Rule">Soft 17 rule:</label>
          <input name="soft17Rule" id="soft17Rule" type="checkbox" checked={form.soft17Rule} onChange={handleChange} />
        </CheckboxBox>
        <ButtonBox>
          <Button variant="primary" type="submit">
            Play
          </Button>
          <Button variant="stand" onClick={() => navigate(RoutesEnum.LandingPage)}>
            Cancel
          </Button>
        </ButtonBox>
      </form>
    </CustomDialog>
  );
};

export default StartGameDialog;

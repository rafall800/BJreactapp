import { FC, useContext } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from '../../../hooks/UseForm';
import RoutesEnum from '../../../routes/routes';
import Button from '../../Button/Button';
import CustomDialog from '../../CustomDialog/CustomDialog';
import CustomInput from '../../CustomInput/CustomInput';
import { BlackJackGameContext } from '../../pages/GamePage/GameManager/GameProvider';
import { ButtonBox, CheckboxBox } from './StartGameDialog.styles';

export interface StartGameDialogForm {
  balance: number;
  decksNumber: number;
  soft17Rule: boolean;
}

const StartGameDialog: FC = () => {
  const navigate = useNavigate();
  const { balance, gameRules, setGameRules, setBalance, startGame, handleSetupPlayers } =
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
          isValid: (decks) => decks >= 6,
          message: 'Needs to be over 4!'
        },
        {
          isValid: (decks) => decks <= 8,
          message: 'Needs to be under 9 !'
        }
      ]
    },
    onSubmit: () => {
      setBalance(form.balance);
      gameRules.decksNumber = form.decksNumber;
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

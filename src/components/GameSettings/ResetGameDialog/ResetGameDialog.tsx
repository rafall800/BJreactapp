import { FC, useContext } from 'react';
import Button from '../../Button/Button';
import CustomDialog from '../../CustomDialog/CustomDialog';
import { ButtonBox } from '../../Game/StartGameDialog/StartGameDialog.styles';
import { BlackJackGameContext } from '../../pages/GamePage/GameManager/GameProvider';
import { Header2 } from '../../textStyles/Header2.styles';

export interface ResetGameDialogProps {
  isOpen: boolean;
  close: () => void;
}

const ResetGameDialog: FC<ResetGameDialogProps> = ({ isOpen, close }) => {
  const { resetGame } = useContext(BlackJackGameContext);

  const handleResetGame = () => {
    close();
    resetGame();
  };

  return (
    <CustomDialog open={isOpen}>
      <Header2>Are you sure?</Header2>
      <ButtonBox>
        <Button variant="primary" type="submit" onClick={handleResetGame}>
          Reset
        </Button>
        <Button variant="stand" onClick={close}>
          Cancel
        </Button>
      </ButtonBox>
    </CustomDialog>
  );
};

export default ResetGameDialog;

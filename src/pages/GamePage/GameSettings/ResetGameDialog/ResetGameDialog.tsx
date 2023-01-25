import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../../components/Button/Button';
import CustomDialog from '../../../../components/CustomDialog/CustomDialog';
import { Header2 } from '../../../../components/textStyles/Header2.styles';
import { ButtonBox } from '../../Game/StartGameDialog/StartGameDialog.styles';

export interface ResetGameDialogProps {
  isOpen: boolean;
  close: () => void;
}

const ResetGameDialog: FC<ResetGameDialogProps> = ({ isOpen, close }) => {
  const navigate = useNavigate();

  const handleResetGame = () => {
    close();
    navigate(0);
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

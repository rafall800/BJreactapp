import { FC } from 'react';
import { StyledHamburger } from './Hamburge.styles';

const Hamburger: FC<React.HTMLAttributes<HTMLButtonElement>> = ({ id, onClick }) => {
  return (
    <StyledHamburger id={id} onClick={onClick}>
      <span id="bar1"></span>
      <span id="bar2"></span>
      <span id="bar3"></span>
    </StyledHamburger>
  );
};

export default Hamburger;

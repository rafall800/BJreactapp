import { FC, useState } from 'react';
import { Popup, StyledAbout } from './About.styles';
import { ReactComponent as HelpIcon } from '../../assets/icons/help.svg';
import { DefaultProps } from '../../utils/types';

const About: FC<DefaultProps> = ({ children }) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };
  return (
    <StyledAbout
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseOut}
      onTouchStart={handleMouseOver}
      onTouchEnd={handleMouseOut}
    >
      <HelpIcon width={50} height={50} />
      {isHovering && <Popup>{children}</Popup>}
    </StyledAbout>
  );
};

export default About;

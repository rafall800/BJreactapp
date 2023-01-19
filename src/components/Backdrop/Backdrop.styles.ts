import styled from '@emotion/styled';

export const StyledBackdrop = styled.div`
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  visibility: hidden;
  opacity: 0;

  transition: opacity ease-in-out 0.25s, visibility ease-in-out 0.25s;
  -webkit-transition: opacity ease-in-out 0.25s, visibility ease-in-out 0.25s;
  -moz-transition: opacity ease-in-out 0.25s, visibility ease-in-out 0.25s;

  background-color: rgba(0, 0, 0, 0.25);
  img {
    max-width: 100vw;
    cursor: pointer;
  }
`;

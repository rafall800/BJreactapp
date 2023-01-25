import styled from '@emotion/styled';

export const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  h3 ~ p,
  ul {
    margin-left: 50px;
  }
  p ~ ul {
    margin-left: 80px;
  }
  p + div {
    margin-left: 50px;
  }
`;

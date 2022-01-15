import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
`;

export const Title = styled.h4`
  margin-top: 1rem;
  margin-bottom: 1.5rem;
  color: var(--primary-color);
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;

  button {
    width: 5rem;
  }
`;

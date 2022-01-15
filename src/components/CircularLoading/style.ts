import styled from 'styled-components';

interface ContainerProps {
  alignOn: string;
}

export const Container = styled.div<ContainerProps>`
  width: 95%;
  margin-top: 1rem;
  display: flex;
  align-items: ${props => props.alignOn};
  justify-content: ${props => props.alignOn};
`;

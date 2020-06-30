import styled, { css } from 'styled-components';
import { shade } from 'polished';
interface FormProps {
  hasError: boolean;
}
export const DashboardTitle = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
  margin-top: 40px;
  max-width: 450px;
  line-height: 50px;
`;

export const Form = styled.form<FormProps>`
  margin-top: 80px;
  max-width: 700px;
  display: flex;

  input {
    flex: 1;
    height: 70px;
    padding: 0 24px;

    border-radius: 5px 0 0 5px;
    color: #3a3a3a;
    border: 2px solid #fff;
    border-right: 0;

    ${props =>
      props.hasError &&
      css`
        border-color: #c53030;
      `}

    &::placeholder {
      color: #a8a8b3;
    }
  }

  button {
    height: 70px;
    width: 210px;
    background-color: #04d361;
    color: #fff;
    font-weight: bold;
    border-radius: 0 5px 5px 0;
    border: 0;
    transition: background-color 0.2s;

    &:hover {
      background-color: ${shade(0.2, '#04d361')};
    }
  }
`;

export const Repositories = styled.div`
  margin-top: 80px;
  max-width: 700px;
  a {
    padding: 24px;
    display: flex;
    background-color: #fff;
    width: 100%;
    text-decoration: none;
    border-radius: 5px;
    align-items: center;
    transition: transform 0.2s;
    &:hover {
      transform: translateX(10px);
    }

    & + a {
      margin-top: 18px;
    }

    img {
      width: 64px;
      height: 64px;
      border-radius: 50%;
    }

    div {
      margin: 0px 16px;
      flex: 1;
      strong {
        font-size: 20px;
        color: #3d3d4d;
      }
      p {
        font-size: 18px;
        margin-top: 4px;
        color: #a8a8b3;
      }
    }

    svg {
      margin-left: auto;
      color: #cbcbd6;
    }
  }
`;

export const Error = styled.span`
  display: block;
  color: #c53030;
  margin-top: 8px;
`;

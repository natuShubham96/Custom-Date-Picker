import React from 'react';
import logo from './logo.svg';
import './App.css';
import DatePicker from './DatePicker';
import styled from 'styled-components';

function App() {
  return (
    <Wrapper>
      <DatePicker />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default App;

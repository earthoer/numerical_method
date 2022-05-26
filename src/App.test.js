/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable jest/valid-expect */
/* eslint-disable testing-library/no-wait-for-side-effects */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';
const axios = require('axios')
test('renders learn react link', () => {
  render(<App />);
});

test('test link bisection',()=>{
  render(<App />);
  expect(screen.getByText('NumerHub')).toBeInTheDocument();
})
test('user can enter bisection',()=>{
  render(<App />)
  fireEvent.click(screen.getByText("Root of Equation"))
  expect(screen.getByText("bisection")).toBeInTheDocument();

})

test('user can hover Root eq and enter bisection',()=>{
  render(<App />)
  fireEvent.mouseOver(screen.getByText("Root of Equation"))
  fireEvent.click(screen.getByText("Bisection"))
  expect(screen.getByText("bisection")).toBeInTheDocument();

})
test('user can hover Root eq and enter false position',()=>{
  render(<App />)
  fireEvent.mouseOver(screen.getByText("Root of Equation"))
  fireEvent.click(screen.getByText("False position"))
  expect(screen.getByText("falseposition")).toBeInTheDocument();

})
test('user can hover Linear al and enter cramer',()=>{
  render(<App />)
  fireEvent.mouseOver(screen.getByText("Linear algebra"))
  fireEvent.click(screen.getByText("Cramer"))
  expect(screen.getByText("cramer")).toBeInTheDocument();

})

test('user can hover Linear al and enter gauss eliminate',()=>{
  render(<App />)
  fireEvent.mouseOver(screen.getByText("Linear algebra"))
  fireEvent.click(screen.getByText("Gauss eliminate"))
  expect(screen.getByText("gauseeliminate")).toBeInTheDocument();

})

test('user can hover Interpolation and extrapolation and enter newton divide',()=>{
  render(<App />)
  fireEvent.mouseOver(screen.getByText("Interpolation and Extrapolation"))
  fireEvent.click(screen.getByText("Newton Divide Method"))
  expect(screen.getByText("newtondivide")).toBeInTheDocument();

})

test('user can go to newtondivde after goto bisection',()=>{
  render(<App />)
  fireEvent.mouseOver(screen.getByText("Root of Equation"))
  fireEvent.click(screen.getByText("Bisection"))
  // expect(screen.getByText("bisection")).toBeInTheDocument();
  fireEvent.mouseOver(screen.getByText("Interpolation and Extrapolation"))
  fireEvent.click(screen.getByText("Newton Divide Method"))
  expect(screen.getByText("newtondivide")).toBeInTheDocument();
})


test('api is active', async () =>{
  await axios.post('https://numerapi.herokuapp.com/login', {
        email: "earthgodna@gmail.com",
        password: "0836054655"
    }).then((response) => {
      expect(response).toBeDefined();
    })
},60000)
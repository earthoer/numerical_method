/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable jest/valid-expect */
/* eslint-disable testing-library/no-wait-for-side-effects */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';

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
// test('user can use bisection',()=>{
//   render(<App />)
//   fireEvent.mouseOver(screen.getByText("Root of Equation"))
//   fireEvent.click(screen.getByText("Bisection"))
//   fireEvent.change(,{target:{value:''}})
//   expect(screen.getByText("falseposition")).toBeInTheDocument();

// })

//  test('user can use dropdown',async ()=>{
//     render(<App />)
//     fireEvent.mouseOver(screen.getByText("Root of Equation"))
//     fireEvent.click(screen.getByText("Bisection"))
//     // fireEvent.click(screen.getByTestId("select-option"))
//     fireEvent.change(screen.getByTestId("select-option") ,{
//       target:{value:"x^4-13"}
//     })

//     await waitFor(()=>{
//       // expect(screen.queryByText("43*x-1")).not.toBeInTheDocument()
//       expect(screen.getByText("x^4-13")).toBeInTheDocument()
//     })
    
//     await waitFor(()=>{
//       expect((screen.getByTestId("select-option")).value).toEqual("x^4-13")
//     })
//     // fireEvent.click(screen.getByText("43*x-1"))
//     // await waitFor(()=>{
      
//     //   expect(screen.getByText("Question : 43*x-1")).toBeInTheDocument()
//     // })
    
  
//   })
// test('user can use newton divide',async ()=>{
//   render(<App />)
//   fireEvent.mouseOver(screen.getByText("Interpolation and Extrapolation"))
//   fireEvent.click(screen.getByText("Newton Divide Method"))
//   // fireEvent.click(screen.getByText("select ex equation"))
//   fireEvent.change(screen.getByText("select ex equation"),{target:{value:"[2,3,4], [0.2239,-0.2601,-0.3971], [1,2], 3.2"}})
//   await waitFor(()=>{
//     expect(screen.getByText("[2,3,4], [0.2239,-0.2601,-0.3971], [1,2], 3.2")).toBeInTheDocument()
//   })
//   fireEvent.click(screen.getByText("[2,3,4], [0.2239,-0.2601,-0.3971], [1,2], 3.2"))
//   await waitFor(()=>{
//     expect(screen.getByText("X : [2,3,4]")).toBeInTheDocument()
//   })
// })

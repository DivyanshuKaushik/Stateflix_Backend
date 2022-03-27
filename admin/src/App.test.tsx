// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
import {act} from 'react-dom/test-utils';
import * as ReactDOM from "react-dom";
import App from "./App";

describe('App', function () {
   it('should pass always', function () {
      //  let container = document.createElement('div');
      //  document.body.appendChild(container);
      //  act(() => {
      //      ReactDOM.render(<App />, container);
      //  })
      //  const header = container.querySelector('a');
      //  console.log(header)
      //  expect(header).toBe("Learn React")
   });
});
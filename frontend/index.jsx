import React from 'react';
import { render } from 'react-dom';
import { add, subtract, createObject } from './module';
import App from './app';

const resultA = add(2, 3);
const resultB = subtract(5, 1);
const createdObject = createObject({ a: 'aye', b: 'be' });

console.log(resultA, resultB);
console.log(createdObject);

// render the app
render(<App />, document.getElementById('app'));
import React from 'react';
import { render } from 'react-dom';
import { add, subtract, createObject } from './module';
import styles from './styles.css';

const resultA = add(2, 3);
const resultB = subtract(5, 1);
const createdObject = createObject({ a: 'aye', b: 'be' });

console.log(resultA, resultB);
console.log(createdObject);
console.log(styles);
console.log(styles.globalClass);

const MainApp = () => (
  <h1>Hello again React!</h1>
);

// render the app
render(<MainApp />, document.getElementById('app'));
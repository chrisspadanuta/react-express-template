import { add, subtract, createObject } from './module';
import styles from './styles.css';

const resultA = add(2, 3);
const resultB = subtract(5, 1);
const createdObject = createObject({ a: 'aye', b: 'be' });

console.log(resultA, resultB);
console.log(createdObject);
console.log(styles);
console.log(styles.globalClass);
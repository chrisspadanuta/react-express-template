import log from '../services/logger';

function subtract(a, b) {
  log(`subtracting ${b} from ${a}`);
  return a - b;
}

export default subtract;

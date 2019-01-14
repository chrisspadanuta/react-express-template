/**
 * Simple logger function.
 */
export default function log(...args) {
  const output = args.reduce((acc, arg) => {
    const value = typeof arg === 'object' ? JSON.stringify(arg) : arg;
    return `${acc} ${value}`;
  }, '');
  process.stdout.write(`>${output}\n`);
}

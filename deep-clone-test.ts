import { clone } from './deep-clone';

const testNum = 1;
const testString = 'a';
const testObject = {
  s: new Set([1, 2]),
  str: 'a',
  num: new Number(1),
  m: new Map([[1, 2]]),
  o: {
    a: 'a',
    b: 'b',
  },
  d: new Date(),
  arr: [1, 'a', new Date()],
}

const clonedNum = clone(testNum);
const clonedString = clone(testString);
const clonedObject = clone(testObject);

console.log(`cloneNum: ${clonedNum}, cloneString: ${clonedString}`);

clonedObject.o.a = 'aaa';
console.log('cloneObj: ', clonedObject, 'obj: ', testObject);

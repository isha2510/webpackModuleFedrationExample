import _ from 'lodash';
import Button from './Button';
export function TestComponent() {
  const element = document.createElement('div');
  let a=6;
console.log("Value is ",a);
 
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  

  return element;
}

document.body.appendChild(TestComponent());
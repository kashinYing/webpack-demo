import _ from 'lodash';
import { printMe } from './print';
// import { printModule } from './another';
// import { printModule2 } from './another2';
import '../styles/main.css';

const component = () => {
  const element = document.createElement('div');
  const btn = document.createElement('button');

  element.innerHTML = _.join(['hello', 'webpack'], ' ');

  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;

  element.appendChild(btn);

  return element;
};

// printModule();
// printModule2();

document.body.appendChild(component());

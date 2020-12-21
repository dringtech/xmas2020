import './style.css';
import p5 from './utils/p5';
import * as sketch from './sketch';

const { mount } = p5;

mount(document.querySelector('main'), sketch);

const infoWindow = document.querySelector('aside.info');
document.querySelector('.info [data-action="close-info"]').addEventListener('click', (e) => {
  infoWindow.setAttribute('data-hidden', undefined);
});
document.querySelector('[data-action="show-info"]').addEventListener('click', (e) => {
  infoWindow.removeAttribute('data-hidden');
});

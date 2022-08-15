import { attach } from '../store.js';
import App from '../component/App.js';

const getElement = document.getElementById('root')

attach(App, getElement)
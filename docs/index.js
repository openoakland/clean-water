import { summary } from './template.js';

fetch('data/violations.json')
.then(function(response) {
  return response.json();
})
.then(function(myJson) {
  document.querySelector('.hi').innerHTML = summary(myJson)
});
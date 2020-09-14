import { formatData } from './stuff.js';

class OpenOaklandMapboxColumns extends HTMLElement {
  static get observedAttributes() {
    return ['center','reset'];
  }

  // append an attribute with a checksum of the stringified content?
  attributeChangedCallback(attrName, oldVal, newVal) {
    this.render();
  }

  connectedCallback() {
    this.color = this.getAttribute('color');
    if(!this.color) {
      this.color = '#c00';
    }
  }

  render() {
    let centerPoint = [-119.01383640716884,35.31035103381756];
    if(this.getAttribute('center')) {
      centerPoint = this.getAttribute('center').split(',');
    }
    this.id = 'map'
    mapboxgl.accessToken = this.getAttribute('key');
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v9',
      center: centerPoint,
      zoom: 9.8,
      pitch: 47,
      bearing: -38.37113944877393
    });
    let component = this;
    map.on('load', function() {
      // if we have data on here already go a head and build map:
      let myJson = component.json;
      if(myJson) {
        formatData(myJson, map, component.color)
      }
    });
  }
}

window.customElements.define('cfa-oak-map-columns', OpenOaklandMapboxColumns);







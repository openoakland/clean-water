class ATOverlay extends HTMLElement {
  static get observedAttributes() {
    return ['display'];
  }

  // append an attribute with a checksum of the stringified content?
  attributeChangedCallback(attrName, oldVal, newVal) {
    this.render();
  }

  connectedCallback() {
  }

  render() {
    if(this.html) {
      this.innerHTML = `
        <div class="overlay-content">
          <div class="overlay-interior">
            ${this.html}
          </div>
        </div>
      `;
      this.style.display = 'block';
      document.querySelector('body').style.overflow = 'hidden';

      function overlayClick(e) {
        if(e.target.closest('.overlay-interior')) {
          // clicked inside interior, do nothing, let event proceed
        } else {
          document.querySelector('.overlay-content').removeEventListener('click',overlayClick)
          document.querySelector('.overlay-content').remove();
          document.querySelector('at-overlay').style.display = 'none';
          document.querySelector('body').style.overflow = 'auto';

          let event = new CustomEvent('overlay', {'detail': {'action':'close'}});          
          document.querySelector('at-overlay').dispatchEvent(event);    
        }
      }
      document.querySelector('.overlay-content').addEventListener('click',overlayClick)
    }
  }
}

window.customElements.define('at-overlay', ATOverlay);

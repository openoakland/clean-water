class CleanWaterHeader extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const container = document.createElement('div');
    container.classList.add('header');
    container.innerHTML = `
      <a href="/" class="link active">List</a>
      <a href="/leaderboard" class="link">Leaderboard</a>
      <a href="/chronic.html" class="link">Map of Chronic Violations</a>
    `;

    const linkCSS = document.createElement('link');
    linkCSS.setAttribute('rel', 'stylesheet');
    linkCSS.setAttribute('href', '../index.css');

    shadow.appendChild(linkCSS);
    shadow.appendChild(container);
  }
}
customElements.define('clean-water-header', CleanWaterHeader);

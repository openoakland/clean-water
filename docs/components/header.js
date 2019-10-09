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
      <span class="dates">Reporting Period : 2012-Current*</span>
    `;

    const style = document.createElement('style');
    style.innerHTML = `
      .header {
        margin: 0;
        padding: 10px 20px;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 50px;
        font-size: 1.5rem;
        line-height: 2.25rem;
        color: blue;
        box-sizing: border-box;
      }
      .header a.link {
        margin-right: 30px;
        text-decoration: none;
      }
      .header .link.active {
        color: #000;
      }
      .dates {
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 1.3rem;
      }
    `;

    shadow.appendChild(style);
    shadow.appendChild(container);
  }
}
customElements.define('clean-water-header', CleanWaterHeader);

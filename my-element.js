class AppDrawer extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = "drawuer";
    this.addEventListener("click", () => {
      alert('custom element')
    });
  }
}
window.customElements.define('app-drawer', AppDrawer);
document.createElement('app-drawer');
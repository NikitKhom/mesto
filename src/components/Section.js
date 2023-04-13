export default class Section {
    constructor({renderer}, container) {
        this._renderer = renderer;
        this._container = container;
    }

    renderItems() {
        this._container.innerHTML = '';
        this._renderer();
    }
    
    addItem(element) {
        this._container.append(element);
    }
}

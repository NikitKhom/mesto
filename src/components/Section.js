
export default class Section{
    constructor({renderer}, container, api) {
        // this._renderedItems = items;
        this._renderer = renderer;
        this._container = container;
        this._api = api;
    }

    renderItems() {
        return this._api
        .getCards()
        .then(cards => {
            this._container.innerHTML = '';
            cards.forEach(item => this._renderer(item));
        })
        .catch(err => console.log(err));
    }

    addItem(element) {
        this._container.append(element);
    }

    saveItem(element) {
        return this._api
        .addCard({cardName: element.name, cardLink: element.link})
        .then(res => {
            this.renderItems();
        })
        .catch(err => console.log(err));
    }
}
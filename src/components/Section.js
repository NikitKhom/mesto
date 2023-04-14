export default class Section{ 
    constructor({renderer}, container) { 
        this._renderer = renderer; 
        this._container = container; 
    } 

    renderItems(cards, ownerId) { 
        cards.forEach(card => this._renderer(card, ownerId)); 
    } 

    addItem(element) { 
        this._container.prepend(element); 
    } 
} 
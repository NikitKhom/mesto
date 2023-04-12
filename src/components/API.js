export default class API {
    constructor({token, cohortId}){
        this._token = token;
        this._cohortId = cohortId;
    }

    getUserInfo(){
        return fetch(`https://nomoreparties.co/v1/${this._cohortId}/users/me`, {
            headers: {
                authorization: this._token
            }
        })
        .then(res => {
            if (res.ok) {
                return  res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    getCards(){
        return fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/cards `, {
            headers: {
                authorization: this._token
            }
        })
        .then(res => {
            if (res.ok) {
                return  res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    changeUserInfo({userName, userInfo}) {
        return fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: userName,
                about: userInfo
            })
        })
        .then(res => {
            if (res.ok) {
                return  res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    addCard({cardName, cardLink}) {
        return fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/cards `, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: this._token
            },
            body: JSON.stringify({
                name: cardName,
                link: cardLink
            })
        })
        .then(res => {
            if (res.ok) {
                return  res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }


    deleteCard(cardId){
        return fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token
            }
        })
        .then(res => {
            if (res.ok) {
                return  res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }


    putLike(cardId){
        return fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: {
                authorization: this._token
            }
        })
        .then(res => {
            if (res.ok) {
                return  res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    deleteLike(cardId){
        return fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: this._token
            }
        })
        .then(res => {
            if (res.ok) {
                return  res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    changeUserAvatar(userAvatar) {
        return fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: userAvatar
            })
        })
        .then(res => {
            if (res.ok) {
                return  res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }



}
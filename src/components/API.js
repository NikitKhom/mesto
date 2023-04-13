export default class API {
    constructor({token, cohortId}){
        this._token = token;
        this._cohortId = cohortId;
    }

    getUserInfo(){
        return this._checkServerStatus(
            fetch(`https://nomoreparties.co/v1/${this._cohortId}/users/me`, {
                headers: {
                    authorization: this._token
                }
            })
        )
    }

    getCards(){
        return this._checkServerStatus(
            fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/cards`, {
                headers: {
                    authorization: this._token
                }
            })
        )
    }

    changeUserInfo({userName, userInfo}) {
        return this._checkServerStatus(
            fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/users/me`, {
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
        )
    }

    addCard({cardName, cardLink}) {
        return this._checkServerStatus(
            fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/cards`, {
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
        )
    }

    deleteCard(cardId){
        return this._checkServerStatus(
            fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/cards/${cardId}`, {
                method: 'DELETE',
                headers: {
                    authorization: this._token
                }
            })
        )
    }

    putLike(cardId){
        return this._checkServerStatus(
            fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/cards/${cardId}/likes`, {
                method: 'PUT',
                headers: {
                    authorization: this._token
                }
            })
        )
    }

    deleteLike(cardId){
        return this._checkServerStatus(
            fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/cards/${cardId}/likes`, {
                method: 'DELETE',
                headers: {
                    authorization: this._token
                }
            })
        )
    }

    changeUserAvatar(userAvatar) {
        return this._checkServerStatus(
            fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/users/me/avatar`, {
                method: 'PATCH',
                headers: {
                    authorization: this._token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    avatar: userAvatar
                })
            })
        )
    }

    _checkServerStatus(promise) {
        return promise
        .then(res => {
            if (res.ok) {
                return  res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }
}
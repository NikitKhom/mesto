
export default class UserInfo{
    constructor({avatarContainer, nameContainer, infoContainer}, api) {
        this._avatarContainer = avatarContainer;
        this._nameContainer = nameContainer;
        this._infoContainer = infoContainer;
        this._api = api;
    }

    getUserInfo() {
        return {name: this._nameContainer.textContent, info: this._infoContainer.textContent};
    }

    setUserInfo() {
        return this._api
        .getUserInfo()
        .then(res => {
            this._avatarContainer.src = res.avatar;
            this._nameContainer.textContent = res.name;
            this._infoContainer.textContent = res.about;
        })
        .catch(err => console.log(err))
    } 

    changeUserInfo({userName, userInfo}) {
        return this._api
        .changeUserInfo({userName, userInfo})
        .then(res => {
            return this.setUserInfo();
        })
        .catch(err => console.log(err));
    }
}
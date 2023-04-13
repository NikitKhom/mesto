
export default class UserInfo{
    constructor({avatarContainer, nameContainer, infoContainer}) {
        this._avatarContainer = avatarContainer;
        this._nameContainer = nameContainer;
        this._infoContainer = infoContainer;
        this._ownerId = '';
    }

    getUserInfo() {
        return ({name: this._nameContainer.textContent, info: this._infoContainer.textContent, id: this._ownerId});
    }

    setUserInfo(info) {
        this._avatarContainer.src = info.avatar;
        this._nameContainer.textContent = info.name;
        this._infoContainer.textContent = info.about;
        this._ownerId = info._id;
    } 
}

export default class UserInfo{
    constructor({nameContainer, infoContainer}) {
        this._nameContainer = nameContainer;
        this._infoContainer = infoContainer;
    }

    getUserInfo() {
        return {name: this._nameContainer.textContent, info: this._infoContainer.textContent};
    } 

    setUserInfo({userName, userInfo}) {
        this._nameContainer.textContent = userName;
        this._infoContainer.textContent = userInfo;
    }
}
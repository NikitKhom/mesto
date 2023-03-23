import {
    profileName,
    profileJob
} from '../utils/constants.js';


export default class UserInfo{
    constructor({userName, userInfo}) {
        this._name = userName;
        this._info = userInfo;
    }

    getUserInfo() {
        return {name: this._name, info: this._info};
    }

    setUserInfo({userName, userInfo}) {
        this._name = userName;
        this._info = userInfo;
        profileName.textContent = userName;
        profileJob.textContent = userInfo;
    }
}
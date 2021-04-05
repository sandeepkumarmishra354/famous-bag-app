import { observable, makeObservable, action } from 'mobx';
import { ApiAuth, ApiResponse } from '../api/api.base';
import { sessionTokenManager } from '../utils/session';
import { MySnackbar } from '../utils/snackbar';
import { ILoginOption, ISignupOption } from './data-type/auth/data.auth';
import { StoreBase } from './StoreBase';

export class StoreAuth extends StoreBase {

    @observable
    public loggedIn = false;
    @observable
    public logingIn = false;
    @observable
    public logingOut = false;
    @observable
    public signingUp = false;

    constructor() {
        super();
        makeObservable(this);
    }

    @action
    public setLoggedIn = (status: boolean) => {
        this.loggedIn = status;
    }
    @action
    public setLogingIn = (status: boolean) => {
        this.logingIn = status;
    }
    @action
    public setLogingOut = (status: boolean) => {
        this.logingOut = status;
    }
    @action
    public setSigningUp = (status: boolean) => {
        this.signingUp = status;
    }

    public login = async (data: ILoginOption) => {
        try {
            this.setLogingIn(true);
            let response = (await ApiAuth.post<ApiResponse>('/login', data)).data;
            if (response.status === 200) {
                let token = response.payload.data.token;
                if (token) {
                    //save token
                    await sessionTokenManager.saveToken(token);
                    this.setLogingIn(false);
                    this.setLoggedIn(true);
                } else {
                    this.setLogingIn(false);
                    MySnackbar.showError(response.message);
                }
            } else {
                this.setLogingIn(false);
                MySnackbar.showError(response.message);
            }
        } catch (err) {
            this.setLogingIn(false);
            MySnackbar.showError(err.message);
        }
    }

    public signup = async (data: ISignupOption) => {
        try {
            this.setSigningUp(true);
            let response = (await ApiAuth.post<ApiResponse>('/signup', data)).data;
            if (response.status === 200) {
                let token = response.payload.data.token;
                if (token) {
                    //save token
                    await sessionTokenManager.saveToken(token);
                    this.setSigningUp(false);
                    this.setLoggedIn(true);
                } else {
                    this.setSigningUp(false);
                    MySnackbar.showError(response.message);
                }
            } else {
                this.setSigningUp(false);
                MySnackbar.showError(response.message);
            }
        } catch (err) {
            this.setSigningUp(false);
            MySnackbar.showError(err.message);
        }
    }
    
    public logout = async () => {
        try {
            this.setLogingOut(true);
            let response = (await ApiAuth.get<ApiResponse>('/logout')).data;
            if (response.status === 200) {
                //remove token
                await sessionTokenManager.removeToken();
                this.setLogingOut(false);
                this.setLoggedIn(false);
            } else {
                this.setLogingOut(false);
                MySnackbar.showError(response.message);
            }
        } catch (err) {
            this.setLogingOut(false);
            MySnackbar.showError(err.message);
        }
    }

    public async init() {
        //
    }
    public async clean() {
        //
    }
};
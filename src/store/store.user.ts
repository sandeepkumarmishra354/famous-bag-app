import { observable, makeObservable, action } from 'mobx';
import { ApiResponse, ApiUser } from '../api/api.base';
import { MySnackbar } from '../utils/snackbar';
import { IProfileData } from './data-type/user/data.user';
import { StoreBase } from './StoreBase';

export class StoreUser extends StoreBase {

    @observable
    public fetchingProfile = true;
    @observable
    public profileData!: IProfileData;

    constructor() {
        super();
        makeObservable(this);
    }

    @action
    private _setFetchingProfile = (status: boolean) => {
        if(this.fetchingProfile !== status)
            this.fetchingProfile = status;
    }
    @action
    private _setProfile = (data: IProfileData) => {
        this.profileData = data;
    }

    public fetchProfile = async () => {
        try {
            if (!this.profileData) {
                this._setFetchingProfile(true);
                let response = (await ApiUser.get<ApiResponse>('/profile')).data;
                if (response.status === 200) {
                    this._setProfile(response.payload.data);
                } else {
                    MySnackbar.showError(response.message);
                }
                this._setFetchingProfile(false);
            }
        } catch (err) {
            console.error(err.message);
            this._setFetchingProfile(false);
        }
    }

    public update = async () => {
        //
    }

    public async init() {
        //
    }
    public async clean() {
        //
    }
}
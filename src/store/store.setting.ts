import { observable, makeObservable, action } from 'mobx';
import { StoreBase } from './StoreBase';

export class StoreSetting extends StoreBase {

    @observable
    public loading = false;

    constructor() {
        super();
        makeObservable(this);
    }

    @action
    public setLoading = (status:boolean) => {
        this.loading = status;
    }

    public async init() {
        //
    }
    public async clean() {
        //
    }
}
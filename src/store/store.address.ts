import { observable, makeObservable, action } from 'mobx';
import { IAddressData } from './data-type/user/data.user';
import { StoreBase } from './StoreBase';

export class StoreAddress extends StoreBase {

    @observable
    public loading = false;
    @observable
    public prefferedAddress!: IAddressData;

    constructor() {
        super();
        makeObservable(this);
        this.prefferedAddress = {
            addressId: '1212sdewe',
            country: 'India',
            customerName: 'Customer Name',
            district: 'District',
            fullAddress: 'Your full delivery address',
            landmark: 'this is landmark',
            phone: '+91-1234567890',
            state: 'State',
            zipCode: '123456'
        };
    }

    @action
    public setLoading = (status: boolean) => {
        this.loading = status;
    }

    public init(): void {
        //
    }
    public clean(): void {
        //
    }
}
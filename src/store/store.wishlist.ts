import { observable, makeObservable, action } from 'mobx';
import { IWishlistItem } from './data-type/wishlist/data.wishlist';
import { StoreBase } from './StoreBase';

const BAG_URL2 = "https://sslimages.shoppersstop.com/sys-master/images/h89/h12/14528643006494/206773901_9204.jpg_230Wx334H";
const BAG_URL3 = "https://5.imimg.com/data5/ZL/LG/NA/SELLER-88832856/0933-6--500x500.jpg";

export class StoreWishlist extends StoreBase {

    @observable
    public loading = false;
    @observable
    public data: Array<IWishlistItem> = [];

    constructor() {
        super()
        makeObservable(this);
        this.data = [{
            image: BAG_URL2,
            name: 'Aristocrat- VIP Scuba 01 - 14 Ltrs Teal Casual Backpack',
            price: 699,
            productId: '23De4'
        }, {
            image: BAG_URL3,
            name: 'POLESTAR- Ranker Blue Casual bagpack/Travel Laptop Backpack Bag',
            price: 799,
            productId: '12Df%'
        }, {
            image: BAG_URL2,
            name: 'Aristocrat- VIP Scuba 01 - 14 Ltrs Teal Casual Backpack',
            price: 699,
            productId: '23De34'
        }, {
            image: BAG_URL3,
            name: 'POLESTAR- Ranker Blue Casual bagpack/Travel Laptop Backpack Bag',
            price: 799,
            productId: '12Df%2cf'
        }];
    }

    @action
    public setLoading = (status: boolean) => {
        this.loading = status;
    }

    public init(): void {
        throw new Error('Method not implemented.');
    }
    public clean(): void {
        throw new Error('Method not implemented.');
    }
}
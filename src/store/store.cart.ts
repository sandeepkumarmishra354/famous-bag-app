import { observable, makeObservable, action } from 'mobx';
import { ECartDataType, ICartData } from './data-type/cart/data.cart';
import { StoreBase } from './StoreBase';

const BAG_URL2 = "https://sslimages.shoppersstop.com/sys-master/images/h89/h12/14528643006494/206773901_9204.jpg_230Wx334H";
const BAG_URL3 = "https://5.imimg.com/data5/ZL/LG/NA/SELLER-88832856/0933-6--500x500.jpg";

export class StoreCart extends StoreBase {

    @observable
    public loading = false;
    @observable
    public data: Array<ICartData> = [];

    constructor() {
        super();
        makeObservable(this);
        this.data = [
            {
                type: ECartDataType.ITEM,
                key:'12fe',
                data: {
                    image: BAG_URL2,
                    name: 'Aristocrat- VIP Scuba 01 - 14 Ltrs Teal Casual Backpack',
                    price: 12999,
                    productId: '1df3',
                    quantity: 1
                }
            },
            {
                type: ECartDataType.ITEM,
                key: '12fe2s',
                data: {
                    image: BAG_URL3,
                    name: 'POLESTAR- Ranker Blue Casual bagpack/Travel Laptop Backpack Bag',
                    price: 12999,
                    productId: '4fdse',
                    quantity: 1
                }
            },
            {
                type: ECartDataType.PRICE_DETAIL,
                key: '12feds#4d',
                data: {
                    items:2,
                    delivery: 0,
                    discount: 65,
                    other: 40,
                    price: 25998,
                    finalAmount:26038
                }
            }
        ];
    }

    @action
    public setLoading = (status: boolean) => {
        this.loading = status;
    }

    public async init() {
        //
    }
    public async clean() {
        //
    }
}
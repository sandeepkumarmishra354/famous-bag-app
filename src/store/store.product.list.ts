import { observable, makeObservable, action } from 'mobx';
import { IItem } from './data-type/product/data.product';
import { StoreBase } from './StoreBase';

const BAG_URL1 = "https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/1850669/2017/5/19/11495178995362-Safari-Unisex-Trolley-Bag-2101495178995061-1.jpg";
const BAG_URL2 = "https://sslimages.shoppersstop.com/sys-master/images/h89/h12/14528643006494/206773901_9204.jpg_230Wx334H";
const BAG_URL3 = "https://5.imimg.com/data5/ZL/LG/NA/SELLER-88832856/0933-6--500x500.jpg";

const getRandom = (arr: any[]) => {
    return arr[Math.floor(Math.random() * arr.length)];
}

export class StoreProductList extends StoreBase {

    @observable
    public fetching = false;
    @observable
    public data: Array<IItem> = [];

    constructor() {
        super();
        makeObservable(this);
        setTimeout(() => {
            let arr = [BAG_URL1, BAG_URL2, BAG_URL3];
            let d = {
                name: 'Aristocrat- VIP Scuba 01 - 14 Ltrs Teal Casual Backpack',
                offerText: '', price: 599,
            };
            let tmp: Array<IItem> = [];
            for(let i=0; i<=25; i++) {
                tmp.push({
                    ...d,
                    id: i.toString(),
                    image: getRandom(arr)
                });
            }
            this.data = tmp;
        }, 1500);
    }

    @action
    public setFetching = (status: boolean) => {
        this.fetching = status;
    }

    public async init() {
        //
    }
    public async clean() {
        //
    }
}
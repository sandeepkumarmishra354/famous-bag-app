import { observable, makeObservable, action } from 'mobx';
import { EHomeDataType, IHomeData } from './data-type/home/data.home';
import { ICategoryProduct, IItem } from './data-type/product/data.product';
import { StoreBase } from './StoreBase';

const BAG_URL1 = "https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/1850669/2017/5/19/11495178995362-Safari-Unisex-Trolley-Bag-2101495178995061-1.jpg";
const BAG_URL2 = "https://sslimages.shoppersstop.com/sys-master/images/h89/h12/14528643006494/206773901_9204.jpg_230Wx334H";
const BAG_URL3 = "https://5.imimg.com/data5/ZL/LG/NA/SELLER-88832856/0933-6--500x500.jpg";

const IMG_URL1 = "https://assetscdn1.paytm.com/images/catalog/view_item/278209/1549347203980.jpg?imwidth=1600&impolicy=hq";
const IMG_URL2 = "https://vipindustries.co.in/resources/images/vip/home/vip-bag-banner.jpg";
const IMG_URL3 = "https://assetscdn1.paytm.com/images/catalog/view_item/245147/1549347150537.jpg?imwidth=480&impolicy=hq";
const IMG_URL4 = "https://images.freeclues.com/assets/images/coupons/coupon_ebc0327a8217150228e1d8f070ccd704.jpg";

export class StoreHome extends StoreBase {

    @observable
    public loading = false;

    @observable
    data: Array<IHomeData> = [];

    constructor() {
        super();
        makeObservable(this);
        let p1: IItem = {
            id: '1', image: BAG_URL1,
            name: 'American Tourister- Crone 29 Ltrs Black Casual Backpack (FG8 (0) 09 207)',
            offerText: '(25% EXTRA OFF)', price: 699
        };
        let p2: IItem = {
            id: '2', image: BAG_URL2,
            name: 'Aristocrat- VIP Scuba 01 - 14 Ltrs Teal Casual Backpack',
            offerText: '(15% EXTRA OFF)', price: 499
        };
        let p3: IItem = {
            id: '3', image: BAG_URL3,
            name: 'POLESTAR- Ranker Blue Casual bagpack/Travel Laptop Backpack Bag',
            offerText: '', price: 1299
        };
        let p4: IItem = {
            id: '4', image: BAG_URL1,
            name: 'POLESTAR- Ranker Blue Casual bagpack/Travel Laptop Backpack Bag',
            offerText: '', price: 1299
        };
        this.data = [
            { data: [IMG_URL1, IMG_URL2, IMG_URL3, IMG_URL4], type: EHomeDataType.IMAGE_SLIDE, key: '1' },
            {
                data: { categoryId: '1', heading: 'School Bags', items: [p1, p2, p3, p4] },
                type: EHomeDataType.PRODUCT, key: '2'
            },
            {
                data: { categoryId: '2', heading: 'File Bags', items: [p1, p2, p3, p4] },
                type: EHomeDataType.PRODUCT, key: '3'
            },
            {
                data: { categoryId: '3', heading: 'Trrolley Bags', items: [p1, p2, p3, p4] },
                type: EHomeDataType.PRODUCT, key: '4'
            },
            {
                data: { categoryId: '4', heading: 'Travel Bags', items: [p1, p2, p3, p4] },
                type: EHomeDataType.PRODUCT, key: '5'
            },
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

    public getProduct = () => {
        return this.data[1].data as ICategoryProduct ;
    }
}
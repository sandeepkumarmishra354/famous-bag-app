import { observable, makeObservable, action } from 'mobx';
import { EProductDetailType, IItem, IProductFullDetail } from './data-type/product/data.product';
import { StoreBase } from './StoreBase';

const BAG_URL1 = "https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/1850669/2017/5/19/11495178995362-Safari-Unisex-Trolley-Bag-2101495178995061-1.jpg";
const BAG_URL2 = "https://sslimages.shoppersstop.com/sys-master/images/h89/h12/14528643006494/206773901_9204.jpg_230Wx334H";
const BAG_URL3 = "https://5.imimg.com/data5/ZL/LG/NA/SELLER-88832856/0933-6--500x500.jpg";

export class StoreProductDetail extends StoreBase {

    @observable
    public fetching = false;
    @observable
    public data: Array<IProductFullDetail> = []

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
        //
        this.data = [{
            key: 'df#4',
            type: EProductDetailType.BASIC_INFO,
            data: {
                photos: [BAG_URL1, BAG_URL2, BAG_URL3],
                brand: 'American Tourister',
                model: 'Crone 29 Ltrs Black Casual Backpack (FG8 (0) 09 207)',
                price: 1299,
                rating: 3.6,
                ratingCount: 212,
                inWishlist:true,
                inCart:false
            }
        }, {
            key: '34',
                type: EProductDetailType.FEATURES,
            data: { features: [{ key: 'Dimentions', value: '20 X 30' }, { key: 'Volume', value: '35 L' }, { key: 'Material', value: 'Genuine leather' }, { key: 'Water proof', value: 'Yes' }] }
        }, {
            key: 'fe3',
                type: EProductDetailType.CATEGORIES,
            data: { categories: ['College bag for UNISEX.', 'Use tony zippers.', 'Quick grab hauk -Loop for easy of carrying.', 'Padded back system for better comfort.'] }
        }, {
            key: '2',
                type: EProductDetailType.PRODUCTS,
            data: { categoryId: '1', heading: 'You May Like', items: [p1, p2, p3] }
        }, {
            key: '1',
                type: EProductDetailType.TAGS,
            data: { tags: ['WATER', 'SCHOOL', 'TROLLEY', 'KIDS', 'TRAVEL', 'LEATHER'] }
        }];
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
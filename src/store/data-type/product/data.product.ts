export enum EProductDetailType {
    BASIC_INFO = 'BASIC_INFO',
    FEATURES = 'FEATURES',
    TAGS = 'TAGS',
    CATEGORIES = 'CATEGORIES',
    REVIEWS = 'REVIEWS',
    PRODUCTS = 'PRODUCTS'
};
export interface IItem {
    id: string,
    image: string,
    price: number,
    name: string,
    offerText: string
};
export interface ICategoryProduct {
    heading: string,
    categoryId: string,
    items: Array<IItem>
};
export interface IItemBasicDetail {
    photos: Array<string>,
    brand: string,
    model: string,
    price: number,
    colors?: Array<string>,
    rating: number,
    ratingCount: number,
    inWishlist:boolean,
    inCart:boolean
};
export interface IItemBasicReview {
    id: string,
    name: string,
    rating: number,
    review: string,
    date: Date
};
export interface IItemFeature {
    features: Array<{ key: string, value: string }>
};
export interface IItemTag {
    tags: Array<string>
};
export interface IItemCategory {
    categories: Array<string>
};
export interface IItemReview {
    reviews: Array<IItemBasicReview>
};
export interface IProductFullDetail {
    key: string | number,
    type: EProductDetailType,
    data: IItemBasicDetail | IItemFeature | IItemTag |
            IItemCategory | IItemReview | ICategoryProduct
};
export interface ICategory {
    name:string,
    id:string
};
export interface ISubCategory extends ICategory {
    categoryId:string,
};
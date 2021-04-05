export enum ECartDataType {
    ITEM = 'ITEM',
    PRICE_DETAIL = 'PRICE_DETAIL'
};
export interface ICartItem {
    productId: string,
    name: string,
    price: number,
    image: string,
    quantity: number,
    discount: number,
};
export interface ICartPriceDetail {
    items: number,
    price: number,
    discount: number,
    delivery: number,
    other: number,
    finalAmount: number
};
export interface ICartData {
    type: ECartDataType,
    key: string | number,
    data: ICartItem | ICartPriceDetail
};
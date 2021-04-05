import { ICategoryProduct } from "../product/data.product";

export enum EHomeDataType {
    PRODUCT = 'PRODUCT',
    IMAGE_SLIDE = 'IMAGE_SLIDE'
};
export interface IHomeData {
    key: string | number,
    type: EHomeDataType,
    data: Array<string> | ICategoryProduct
};
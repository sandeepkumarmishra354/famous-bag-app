import { StoreAddress } from "./store.address";
import { StoreAuth } from "./store.auth";
import { StoreCart } from "./store.cart";
import { StoreHome } from "./store.home";
import { StoreProductDetail } from "./store.product.detail";
import { StoreProductList } from "./store.product.list";
import { StoreSetting } from "./store.setting";
import { StoreUser } from "./store.user";
import { StoreWishlist } from "./store.wishlist";

const storeAuth = new StoreAuth();
const storeUser = new StoreUser();
const storeHome = new StoreHome();
const storeProductDetail = new StoreProductDetail();
const storeProductList = new StoreProductList();
const storeSetting = new StoreSetting();
const storeCart = new StoreCart();
const storeWishlist = new StoreWishlist();
const storeAddress = new StoreAddress();

export const AppDataStore = {
    storeAuth, storeUser, storeHome, storeCart,
    storeProductDetail, storeProductList, storeSetting,
    storeWishlist,storeAddress
};
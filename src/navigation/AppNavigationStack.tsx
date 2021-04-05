import React, { PureComponent } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationOptions, TransitionPresets } from '@react-navigation/stack'
import { stackNavigationRef } from './NavUtils';
import ScreenHome from '../ui/screen/home/ScreenHome';
import ScreenLogin from '../ui/screen/auth/ScreenLogin';
import ScreenSignup from '../ui/screen/auth/ScreenSignup'
import MyAccount from '../ui/screen/user/MyAccount';
import ModalCategory from '../ui/screen/home/ModalCategory';
import { StoreAuth } from '../store/store.auth';
import { inject, observer } from 'mobx-react';
import ScreenProductDetail from '../ui/screen/product/ScreenProductDetail';
import ScreenSetting from '../ui/screen/setting/ScreenSetting';
import ScreenCart from '../ui/screen/cart/ScreenCart';
import ScreenWishlist from '../ui/screen/wishlist/ScreenWishlist';
import ModalSearch from '../ui/screen/home/ModalSearch';
import ScreenProductList from '../ui/screen/product/ScreenProductList';
import ModalFilter from '../ui/screen/product/ModalFilter';
import ScreenOrderPlace from '../ui/screen/order/ScreenOrderPlace';

export enum AppScreens {
    SPLASH = 'SCREEN-SPLASH',
    HOME = 'SCREEN-HOME',
    LOGIN = 'SCREEN-LOGIN',
    SIGNUP = 'SCREEN-SIGNUP',
    MY_ACCOUNT = 'SCREEN-MY-ACCOUNT',
    MODAL_CATEGORY = 'MODAL-CATEGORY',
    PRODUCT_DETAIL = 'PRODUCT-DETAIL',
    SETTING = 'SCREEN-SETTING',
    CART = 'SCREEN-CART',
    WISHLIST = 'SCREEN-WISHLIST',
    MODAL_SEARCH = 'MODAL-SEARCH',
    MODAL_FILTER = 'MODAL-FILTER',
    PRODUCT_LIST = 'SCREEN-PRODUCT-LIST',
    ORDER_PLACE = 'SCREEN-ORDER-PLACE',
};

export type AppStackParamList = {
    [AppScreens.SPLASH]: undefined,
    [AppScreens.HOME]: undefined,
    [AppScreens.LOGIN]: undefined,
    [AppScreens.SIGNUP]: undefined,
    [AppScreens.MY_ACCOUNT]: undefined,
    [AppScreens.MODAL_CATEGORY]: undefined,
    [AppScreens.PRODUCT_DETAIL]: { productId: string },
    [AppScreens.SETTING]: undefined,
    [AppScreens.CART]: undefined,
    [AppScreens.WISHLIST]: undefined,
    [AppScreens.MODAL_SEARCH]: undefined,
    [AppScreens.MODAL_FILTER]: undefined,
    [AppScreens.ORDER_PLACE]: undefined,
    [AppScreens.PRODUCT_LIST]: { category?: string, subcategory?: string, query?: string },
};

const AppStack = createStackNavigator<AppStackParamList>();
const AuthStack = createStackNavigator();

const ModalTransition: StackNavigationOptions = {
    animationEnabled: true,
    headerShown: false,
    ...TransitionPresets.ModalSlideFromBottomIOS
}

const AuthRoute = () => (
    <AuthStack.Navigator
        headerMode='none'
        initialRouteName={AppScreens.LOGIN}
        screenOptions={{
            ...TransitionPresets.SlideFromRightIOS
        }}>
        <AuthStack.Screen name={AppScreens.LOGIN} component={ScreenLogin} />
        <AuthStack.Screen name={AppScreens.SIGNUP} component={ScreenSignup} />
    </AuthStack.Navigator>
);

const HomeRoute = () => (
    <AppStack.Navigator
        headerMode='none'
        initialRouteName={AppScreens.HOME}
        screenOptions={{
            ...TransitionPresets.SlideFromRightIOS
        }}>
        <AppStack.Screen name={AppScreens.HOME} component={ScreenHome} />
        <AppStack.Screen name={AppScreens.MY_ACCOUNT} component={MyAccount} />
        <AppStack.Screen name={AppScreens.PRODUCT_DETAIL} component={ScreenProductDetail} />
        <AppStack.Screen name={AppScreens.SETTING} component={ScreenSetting} />
        <AppStack.Screen name={AppScreens.CART} component={ScreenCart} />
        <AppStack.Screen name={AppScreens.WISHLIST} component={ScreenWishlist} />
        <AppStack.Screen name={AppScreens.PRODUCT_LIST} component={ScreenProductList} />
        <AppStack.Screen name={AppScreens.ORDER_PLACE} component={ScreenOrderPlace} />
        <AppStack.Screen
            name={AppScreens.MODAL_CATEGORY}
            component={ModalCategory}
            options={ModalTransition} />
        <AppStack.Screen
            name={AppScreens.MODAL_SEARCH}
            component={ModalSearch}
            options={ModalTransition} />
        <AppStack.Screen
            name={AppScreens.MODAL_FILTER}
            component={ModalFilter}
            options={ModalTransition} />
    </AppStack.Navigator>
);

@inject("storeAuth")
@observer
export class AppNavigationStack extends PureComponent<{ storeAuth?: StoreAuth }> {
    render() {
        return (
            <NavigationContainer ref={stackNavigationRef}>
                {this.props.storeAuth?.loggedIn ? <HomeRoute /> : <AuthRoute />}
            </NavigationContainer>
        );
    }
}
import { inject, observer } from 'mobx-react';
import React, { PureComponent } from 'react'
import { FlatList, View } from 'react-native';
import { ActivityIndicator, Card, withTheme } from 'react-native-paper';
import { AppScreens } from '../../../navigation/AppNavigationStack';
import { NavigationProps } from '../../../navigation/NavUtils';
import { ECartDataType, ICartData } from '../../../store/data-type/cart/data.cart';
import { StoreCart } from '../../../store/store.cart';
import { formatCurrency } from '../../../utils/app_utils';
import MyCaption from '../../component/MyCaption';
import MySubheading from '../../component/MySubheading';
import MyTitle from '../../component/MyTitle';
import MyTouchable from '../../component/MyTouchable';
import ScreenContainer from '../../ScreenContainer';
import CartItem from './component/CartItem';
import CartPriceDetail from './component/CartPriceDetail';

interface Props extends NavigationProps<AppScreens.CART> {
    storeCart: StoreCart,
    theme: ReactNativePaper.Theme
}
interface State {
    loading: boolean
}

@inject("storeCart")
@observer
class ScreenCart extends PureComponent<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = { loading: true };
    }

    componentDidMount = () => {
        setTimeout(() => {
            this.setState({ loading: false });
        }, 800);
    }

    private _onPlace = () => {
        //save order on server side then go-to place screen
        this.props.navigation.navigate(AppScreens.ORDER_PLACE);
    }

    private _renderItem = ({ item }: { item: ICartData }) => {
        switch (item.type) {
            case ECartDataType.ITEM:
                return <CartItem item={item.data as any} />;
            case ECartDataType.PRICE_DETAIL:
                return <CartPriceDetail priceInfo={item.data as any} />
            default:
                return null;
        }
    }

    render() {
        let { primary } = this.props.theme.colors;
        return (
            <ScreenContainer
                title="My Bag"
                showBackAction={this.props.navigation.goBack}>
                {this.state.loading
                    ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size={35} />
                    </View>
                    : <View style={{ flexGrow: 1, width: '100%' }}>
                        <FlatList
                            style={{ flex: 1, width: '100%' }}
                            data={this.props.storeCart.data}
                            renderItem={this._renderItem}
                            showsVerticalScrollIndicator={false} />
                    </View>}
                {!this.state.loading && <Card elevation={5} style={{ paddingHorizontal: 5, borderRadius: 0 }}>
                    <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ padding: 5, flex: 1.5 }}>
                            <MyTitle style={{ color: '#000' }}>{formatCurrency(25973)}</MyTitle>
                            <MyCaption style={{ marginTop: -3, color: '#3944F7', fontWeight: 'bold' }}>view details</MyCaption>
                        </View>
                        <MyTouchable
                            onPress={this._onPlace}
                            style={{ flex: 1, minHeight: 40, backgroundColor: primary, alignItems: 'center', justifyContent: 'center' }}>
                            {/*<ActivityIndicator color='#fff' size={18}/>*/}
                            <MySubheading style={{ color: '#fff' }}>PLACE NOW</MySubheading>
                        </MyTouchable>
                    </View>
                </Card>}
            </ScreenContainer>
        );
    }

}

export default withTheme(ScreenCart);
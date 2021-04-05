import { inject, observer } from 'mobx-react';
import React, { PureComponent } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Card } from 'react-native-paper';
import { AppScreens } from '../../../navigation/AppNavigationStack';
import { AppNavigation, NavigationProps } from '../../../navigation/NavUtils';
import { EProductDetailType, IProductFullDetail } from '../../../store/data-type/product/data.product';
import { StoreProductDetail } from '../../../store/store.product.detail';
import MySubheading from '../../component/MySubheading';
import MyTouchable from '../../component/MyTouchable';
import ScreenContainer from '../../ScreenContainer';
import BasicProductList from '../home/component/BasicProductList';
import ItemBasicInfoView from './component/ItemBasicInfoView';
import ItemCategoriesView from './component/ItemCategoriesView';
import ItemFeaturesView from './component/ItemFeaturesView';
import ItemReviewsView from './component/ItemReviewsView';
import ItemTagsView from './component/ItemTagsView';

interface Props extends NavigationProps<AppScreens.PRODUCT_DETAIL> {
    storeProductDetail: StoreProductDetail
}

@inject("storeProductDetail")
@observer
export default class ScreenProductDetail extends PureComponent<Props,{loading:boolean}> {

    constructor(props:Props) {
        super(props);
        this.state = {loading:true};
    }

    componentDidMount = () => {
        setTimeout(() => {
            this.setState({loading:false});
        },2000);
    }

    private _renderItem = ({ item }: { item: IProductFullDetail }) => {
        switch (item.type) {
            case EProductDetailType.BASIC_INFO:
                return <ItemBasicInfoView key={item.key} data={item.data as any} />;
            case EProductDetailType.CATEGORIES:
                return <ItemCategoriesView key={item.key} data={item.data as any} />;
            case EProductDetailType.FEATURES:
                return <ItemFeaturesView key={item.key} data={item.data as any} />;
            case EProductDetailType.PRODUCTS:
                return <Card style={{ marginBottom: 10, borderRadius: 0 }}>
                    <BasicProductList
                        key={item.key}
                        data={item.data as any}
                        navigation={this.props.navigation} />
                </Card>;
            case EProductDetailType.REVIEWS:
                return <ItemReviewsView key={item.key} data={item.data as any} />;
            case EProductDetailType.TAGS:
                return <ItemTagsView key={item.key} data={item.data as any} />;
            default:
                return null;
        }
    }

    private _onAddBagPress = () => {
        //
    }
    private _onPlaceOrderPress = () => {
        //
    }

    render() {
        return (
            <ScreenContainer
                title="Item Details"
                showBackAction={AppNavigation.goBack}>
                <View style={{ flexGrow: 1, width: '100%' }}>
                    {this.state.loading
                        ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <ActivityIndicator size={35} />
                        </View>
                        : <FlatList
                            data={this.props.storeProductDetail.data}
                            style={{ flex: 1, width: '100%' }}
                            renderItem={this._renderItem}
                            showsVerticalScrollIndicator={false} />}
                </View>
                {!this.state.loading && <Card elevation={6}>
                    <View style={styles.bagCard}>
                        <MyTouchable style={{ flex: 1 }}
                            onPress={this._onAddBagPress}>
                            <View style={{ backgroundColor: '#758283', padding: 10, alignItems: 'center', justifyContent: 'center' }}>
                                <MySubheading style={{ color: '#fff' }}>ADD TO BAG</MySubheading>
                            </View>
                        </MyTouchable>
                        <MyTouchable style={{ flex: 1 }}
                            onPress={this._onAddBagPress}>
                            <View style={{ backgroundColor: '#e65300', padding: 10, alignItems: 'center', justifyContent: 'center' }}>
                                <MySubheading style={{ color: '#fff' }}>PLACE ORDER</MySubheading>
                            </View>
                        </MyTouchable>
                    </View>
                </Card>}
            </ScreenContainer>
        );
    }

}

const styles = StyleSheet.create({
    bagCard: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    }
});
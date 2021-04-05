import { inject, observer } from 'mobx-react';
import React, { PureComponent } from 'react'
import { FlatList, Image, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Card } from 'react-native-paper';
import { AppScreens } from '../../../navigation/AppNavigationStack';
import { AppNavigation, NavigationProps } from '../../../navigation/NavUtils';
import { StoreProductList } from '../../../store/store.product.list';
import MyTouchable from '../../component/MyTouchable';
import ScreenContainer from '../../ScreenContainer';
import Icon from 'react-native-vector-icons/Ionicons';
import MyCaption from '../../component/MyCaption';
import MyDivider from '../../component/MyDivider';
import AppbarActions from '../../component/AppbarActions';
import { IItem } from '../../../store/data-type/product/data.product';
import MySubheading from '../../component/MySubheading';
import { formatCurrency } from '../../../utils/app_utils';
import RatingStar from '../../component/RatingStar';

class FilterSortView extends PureComponent {

    private _onFilterPress = () => {
        AppNavigation.navigate(AppScreens.MODAL_FILTER);
    }
    private _onSortPress = () => {
        //
    }

    render() {
        return (
            <Card
                elevation={6}
                style={{ borderRadius: 0 }}>
                <View
                    style={styles.headerCard}>
                    <MyTouchable style={{ flex: 1 }} onPress={this._onSortPress}>
                        <View style={styles.headerCardItem}>
                            <Icon name="funnel-outline" size={16} color="#000" />
                            <MyCaption
                                style={{ color: "#000", fontWeight: 'bold', marginLeft: 8 }}>SORT</MyCaption>
                        </View>
                    </MyTouchable>
                    <MyTouchable style={{ flex: 1 }} onPress={this._onFilterPress}>
                        <View style={styles.headerCardItem}>
                            <Icon name="filter-outline" size={16} color="#000" />
                            <MyCaption
                                style={{ color: "#000", fontWeight: 'bold', marginLeft: 8 }}>FILTER</MyCaption>
                        </View>
                    </MyTouchable>
                </View>
            </Card>
        );
    }
}

class MyItem extends PureComponent<{ item: IItem }> {

    private _onItemPress = () => {
        AppNavigation.navigate(AppScreens.PRODUCT_DETAIL, { productId: this.props.item.id });
    }

    render() {
        return (
            <MyTouchable
                style={{ flex: 1 }}
                onPress={this._onItemPress}>
                <Card
                    style={{ borderRadius: 0, marginHorizontal: 0.5, marginBottom: 1, flex: 1 }}>
                    <View>
                        <Image
                            style={{ width: '100%', height: 120, resizeMode: 'contain' }}
                            source={{ uri: this.props.item.image }} />
                        <View style={{ padding: 8 }}>
                            <MySubheading
                                style={{ fontSize: 15 }}
                                numberOfLines={1}
                                ellipsizeMode="tail">
                                {this.props.item.name}
                            </MySubheading>
                            <MyCaption style={{ textDecorationLine: 'line-through', color: 'green', fontSize: 14 }}>
                                {formatCurrency(550)}
                            </MyCaption>
                            <MySubheading
                                style={{ color: '#000' }}>
                                {formatCurrency(this.props.item.price)}
                            </MySubheading>
                        </View>
                    </View>
                </Card>
            </MyTouchable>
        );
    }
}


interface Props extends NavigationProps<AppScreens.PRODUCT_LIST> {
    storeProductList: StoreProductList
}

@inject("storeProductList")
@observer
export default class ScreenProductList extends PureComponent<Props, { loading: boolean }> {

    constructor(props: Props) {
        super(props);
        this.state = { loading: true };
    }

    componentDidMount = () => {
        setTimeout(() => {
            this.setState({ loading: false });
        }, 1000);
    }

    private _renderItem = ({ item }: { item: IItem }) => (
        <MyItem item={item} />
    );

    render() {
        let { navigation, route, storeProductList } = this.props;
        return (
            <ScreenContainer
                showBackAction={navigation.goBack}
                actions={<AppbarActions />}
                title="Category Name">
                {!this.state.loading && <FilterSortView />}
                {this.state.loading
                    ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size={35} />
                    </View>
                    : <View style={{ flexGrow: 1, width: '100%' }}>
                        <FlatList
                            data={storeProductList.data}
                            style={{ flex: 1, width: '100%' }}
                            numColumns={2}
                            renderItem={this._renderItem}
                            showsVerticalScrollIndicator={false} />
                    </View>}
            </ScreenContainer>
        );
    }

}

const styles = StyleSheet.create({
    headerCard: {
        width: '100%',
        height: 54,
        backgroundColor: '#fff',
        borderRadius: 0,
        flexDirection: 'row'
    },
    headerCardItem: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
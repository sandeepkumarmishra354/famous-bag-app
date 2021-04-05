import { StackNavigationProp } from '@react-navigation/stack';
import React, { PureComponent } from 'react'
import { FlatList, Image, StyleSheet, View } from 'react-native';
import { AppScreens, AppStackParamList } from '../../../../navigation/AppNavigationStack';
import { AppNavigation } from '../../../../navigation/NavUtils';
import { ICategoryProduct, IItem } from '../../../../store/data-type/product/data.product';
import { formatCurrency } from '../../../../utils/app_utils';
import MyCaption from '../../../component/MyCaption';
import MyDivider from '../../../component/MyDivider';
import MySubheading from '../../../component/MySubheading';
import MyTitle from '../../../component/MyTitle';
import MyTouchable from '../../../component/MyTouchable';

type NavType = StackNavigationProp<AppStackParamList, AppScreens>;

export class BasicItemView extends PureComponent<{ data: IItem, navigation?: NavType }> {

    private _onItemPress = () => {
        if (this.props.navigation) {
            this.props.navigation.push(AppScreens.PRODUCT_DETAIL, { productId: this.props.data.id });
        } else {
            AppNavigation.navigate(AppScreens.PRODUCT_DETAIL, { productId: this.props.data.id });
        }
    }

    render() {
        return (
            <MyTouchable
                onPress={this._onItemPress}>
                <View style={{ width: 150, alignItems: 'center' }}>
                    <Image
                        style={{ resizeMode: 'contain', width: 145, height: 150 }}
                        source={{ uri: this.props.data.image }} />
                    <MySubheading
                        style={styles.itemName}
                        numberOfLines={1}
                        ellipsizeMode="tail">
                        {this.props.data.name}
                    </MySubheading>
                    <MySubheading
                        style={styles.itemPrice}>{formatCurrency(this.props.data.price)}</MySubheading>
                    <MyCaption style={styles.itemOffer}>{this.props.data.offerText}</MyCaption>
                </View>
            </MyTouchable>
        );
    }
}

interface Props {
    data: ICategoryProduct,
    navigation?: NavType
}

export default class BasicProductList extends PureComponent<Props> {

    private _renderItem = ({ item }: { item: IItem }) => {
        return <BasicItemView data={item} navigation={this.props.navigation} />;
    }

    private _onPressViewAll = () => {
        if (this.props.navigation) {
            this.props.navigation.push(AppScreens.PRODUCT_LIST, {
                category: '',
                query: '',
                subcategory: ''
            });
        } else {
            AppNavigation.navigate(AppScreens.PRODUCT_LIST, {
                category: '',
                query: '',
                subcategory: ''
            });
        }
    }

    render() {
        return (
            <View style={{ padding: 10 }}>
                <View style={styles.headingContainer}>
                    <MyTitle>{this.props.data.heading}</MyTitle>
                    <MyTouchable
                        onPress={this._onPressViewAll}>
                        <MyCaption style={styles.viewall}>{'View All ➨'}</MyCaption>
                    </MyTouchable>
                </View>
                <FlatList
                    data={this.props.data.items}
                    renderItem={this._renderItem}
                    keyExtractor={(item) => item.id}
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={() => (
                        <MyDivider vertical space={0.5} />
                    )}
                    horizontal />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    headingContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
        paddingHorizontal: 6
    },
    viewall: {
        color: '#e65300',
        padding: 3
    },
    itemStyle: {
        //
    },
    itemName: {
        width: 130,
        textAlign: 'center',
    },
    itemPrice: {
        color: '#e65300'
    },
    itemOffer: {
        color: '#1B98F5',
    }
});
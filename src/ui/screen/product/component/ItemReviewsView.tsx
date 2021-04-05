import React, { PureComponent } from 'react'
import { View } from 'react-native';
import { IItemReview } from '../../../../store/data-type/product/data.product';

interface Props {
    data:IItemReview
}

export default class ItemReviewsView extends PureComponent<Props> {

    render() {
        return (
            <View>
            </View>
        );
    }

}
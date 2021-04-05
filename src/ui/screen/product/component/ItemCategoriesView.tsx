import React, { PureComponent } from 'react'
import { Card } from 'react-native-paper';
import { IItemCategory } from '../../../../store/data-type/product/data.product';
import MySubheading from '../../../component/MySubheading';
import MyTitle from '../../../component/MyTitle';

interface Props {
    data: IItemCategory
}

export default class ItemCategoriesView extends PureComponent<Props> {

    render() {
        return (
            <Card style={{ marginBottom: 10, borderRadius: 0 }} elevation={2}>
                <Card.Content>
                    <MyTitle style={{ marginBottom: 8 }}>Categories</MyTitle>
                    {this.props.data.categories.map((c, i) => (
                        <MySubheading style={{ marginLeft: 5 }} key={i}>•  {c}</MySubheading>
                    ))}
                </Card.Content>
            </Card>
        );
    }

}
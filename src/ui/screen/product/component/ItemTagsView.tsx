import React, { PureComponent } from 'react'
import { Card, Chip } from 'react-native-paper';
import { IItemTag } from '../../../../store/data-type/product/data.product';

interface Props {
    data: IItemTag
}

export default class ItemTagsView extends PureComponent<Props> {

    render() {
        let { tags } = this.props.data;
        if (tags !== undefined && tags.length > 0) {
            return (
                <Card style={{ borderRadius: 0, marginBottom: 5 }} elevation={2}>
                    <Card.Content style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {tags.map((tag) => (
                            <Chip style={{ margin: 3 }} key={tag} mode='flat'>{tag}</Chip>
                        ))}
                    </Card.Content>
                </Card>
            );
        }
        return null;
    }

}
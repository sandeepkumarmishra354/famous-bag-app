import React, { PureComponent } from 'react'
import { Card } from 'react-native-paper';
import { IItemFeature } from '../../../../store/data-type/product/data.product';
import MySubheading from '../../../component/MySubheading';
import MyTitle from '../../../component/MyTitle';

interface Props {
    data: IItemFeature
}

export default class ItemFeaturesView extends PureComponent<Props> {

    render() {
        return (
            <Card style={{ marginBottom: 10, borderRadius: 0 }} elevation={2}>
                <Card.Content>
                    <MyTitle style={{ marginBottom: 8 }}>Features</MyTitle>
                    {this.props.data.features.map((f, i) => (
                        <MySubheading style={{ marginLeft: 5 }} key={i}>
                            {`•  ${f.key}-  ${f.value}`}
                        </MySubheading>
                    ))}
                </Card.Content>
            </Card>
        );
    }

}
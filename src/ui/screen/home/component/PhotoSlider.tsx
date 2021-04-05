import React, { PureComponent } from 'react'
import { Dimensions, Image, View } from 'react-native';
import { withTheme } from 'react-native-paper';
import Carousel, { Pagination } from 'react-native-snap-carousel';

interface Props {
    theme: ReactNativePaper.Theme,
    photos: Array<string>
    autoplay?: boolean,
    interval?: number,
    height?: number,
    width?: number
}
interface State {
    activeSlide: number
}

const WIN_WIDTH = Dimensions.get('window').width;

class PhotoSlider extends PureComponent<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = { activeSlide: 0 }
    }

    private _setActiveSlide = (index: number) => {
        this.setState({ activeSlide: index });
    }

    private _renderCarouselItem = (data: { item: string, index: number }) => {
        let width = this.props.width ?? WIN_WIDTH;
        let height = this.props.height ?? 220;
        return <Image
            style={{ width, height, resizeMode: 'contain' }}
            source={{ uri: data.item }} />;
    }

    render() {
        let { primary } = this.props.theme.colors;
        let width = this.props.width ?? WIN_WIDTH;
        return (
            <View>
                <Carousel
                    data={this.props.photos}
                    sliderWidth={width} itemWidth={width}
                    onSnapToItem={this._setActiveSlide}
                    renderItem={this._renderCarouselItem}
                    loop={this.props.autoplay}
                    autoplayInterval={this.props.interval} autoplay={this.props.autoplay}>
                </Carousel>
                <Pagination
                    dotsLength={this.props.photos.length}
                    activeDotIndex={this.state.activeSlide}
                    containerStyle={{ paddingVertical: 5, backgroundColor: '#fff' }}
                    dotStyle={{
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                        marginHorizontal: 0,
                        backgroundColor: primary
                    }} />
            </View>
        );
    }

}

export default withTheme(PhotoSlider);
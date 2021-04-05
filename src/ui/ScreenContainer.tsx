import React, { PureComponent } from 'react'
import { View } from 'react-native'
import { Appbar, withTheme } from 'react-native-paper'
import { material } from 'react-native-typography';

interface Props {
  title?: React.ReactNode,
  subtitle?: React.ReactNode,
  showBackAction?: () => void,
  showMenuAction?: () => void,
  actions?: React.ReactNode,
  theme: ReactNativePaper.Theme,
}

class ScreenContainer extends PureComponent<Props> {

  render() {
    let theme = this.props.theme;
    return (
      <View style={{ flex: 1 }}>
        <Appbar.Header>
          {this.props.showBackAction && <Appbar.Action icon='chevron-back-outline'
            onPress={this.props.showBackAction}
            color={theme.colors.appbarItemColor} />}
          {this.props.showMenuAction && <Appbar.Action icon='grid-outline'
            onPress={this.props.showMenuAction}
            size={22}
            color={theme.colors.appbarItemColor} />}
          <Appbar.Content
            titleStyle={[material.title, { color: '#fff', marginLeft: -8, fontSize: 18 }]}
            title={this.props.title}
            subtitle={this.props.subtitle}
            subtitleStyle={[material.subheading, { color: '#707070' }]}
            color={theme.colors.appbarItemColor} />
          {this.props.actions}
        </Appbar.Header>
        <View style={{ flexGrow: 1, backgroundColor: theme.colors.pageBackground }}>
          {this.props.children}
        </View>
      </View>
    )
  }
}

export default withTheme(ScreenContainer);
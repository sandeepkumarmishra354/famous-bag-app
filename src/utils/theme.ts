import { DefaultTheme } from "react-native-paper";

type BarStyle = "light-content" | "default" | "dark-content";

declare global {
    namespace ReactNativePaper {
        interface ThemeColors {
            appbarItemColor: string,
            iconColor: string,
            pageBackground: string,
            statusBarStyle: BarStyle,
            primaryDark: string,
            editorBackground: string,
            editorText: string,
        }
    }
}

export const AppTheme: ReactNativePaper.Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#e65300',
        primaryDark: '#e65300',
        accent: '#03A9F4',
        background: '#fff',
        surface: '#fff',
        text: '#2F363F',
        //custom colors
        appbarItemColor: '#EAF0F1',
        iconColor: '#616C6F',
        pageBackground: '#EAF0F1',
        statusBarStyle: 'light-content',
        editorBackground: '#fff',
        editorText: '#2B3139',
    }
}
import Snackbar from 'react-native-snackbar';

const options = {
    textColor: '#fff',
    //duration: 1500,//Snackbar.LENGTH_SHORT,
    /*action: {
        text: 'OK',
        textColor: '#fff',
        onPress: () => {
            Snackbar.dismiss();
        }
    }*/
}

export const MySnackbar = {
    showSuccess: async (msg: string,duration = 1500) => {
        Snackbar.show({
            text: msg,
            backgroundColor: '#29B966',
            duration,
            ...options
        });
    },
    showError: async (msg: string, duration = 1500) => {
        Snackbar.show({
            text: msg,
            backgroundColor: '#BF3325',
            duration,
            ...options
        });
    },
    showInfo: async (msg: string, duration = 1500) => {
        Snackbar.show({
            text: msg,
            backgroundColor: '#0C98E2',
            duration,
            ...options
        });
    },
    showWarn: async (msg: string, duration = 1500) => {
        Snackbar.show({
            text: msg,
            backgroundColor: '#E5BA0D',
            duration,
            ...options
        });
    }
};
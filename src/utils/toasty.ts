import Toast from 'react-native-simple-toast';

export const showToast = async (message:string) => {
    Toast.showWithGravity(message,Toast.SHORT,Toast.CENTER);
}
import AsyncStorage from '@react-native-async-storage/async-storage';

class SessionToken {

    private readonly _tokenKey = 'session_token';
    private _currentToken: string | null = null;

    public saveToken = async (token: string) => {
        try {
            await AsyncStorage.setItem(this._tokenKey, token);
            this._currentToken = token;
            return true;
        } catch (err) {
            console.error(err.message);
            return false;
        }
    }

    public getToken = async () => {
        try {
            if (! await this.hasToken()) {
                this._currentToken = await AsyncStorage.getItem(this._tokenKey);
            }
            return this._currentToken;
        } catch (err) {
            console.error(err.message);
            return undefined;
        }
    }

    public removeToken = async () => {
        try {
            await AsyncStorage.removeItem(this._tokenKey);
            return true;
        } catch (err) {
            console.error(err.message);
            return false;
        }
    }

    public hasToken = async () => {
        try {
            this._currentToken = await AsyncStorage.getItem(this._tokenKey);
            if (this._currentToken === undefined || this._currentToken === '' || this._currentToken === null)
                return false;
            return true;
        } catch(err) {
            console.error(err.message);
            return false;
        }
    }
}

export const sessionTokenManager = new SessionToken();
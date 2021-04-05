import 'intl';
import 'intl/locale-data/jsonp/en';

const formatter = new Intl.NumberFormat('en-IN',{
    currency:'INR',
    style:'currency',
    useGrouping:true,
});

const emailRegx = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

export const formatCurrency = (amount:number) => formatter.format(amount);
export const isValidEmail = (email:string) => emailRegx.test(email);
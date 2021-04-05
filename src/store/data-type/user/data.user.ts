export interface IProfileData {
    createdAt: Date,
    updatedAt: Date,
    firstName: string,
    lastName: string,
    photo: string,
    email: string,
    phone: string,
    accountStatus: 'active' | 'blocked',
    codStatus: 'blocked' | 'enabled',
    phoneVerified: boolean,
};
export interface IAddressData {
    addressId:string,
    state: string,
    country: string,
    district: string,
    zipCode: string,
    landmark: string,
    fullAddress: string,
    phone: string,
    customerName: string
};
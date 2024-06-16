import { IYooCheckoutOptions, YooCheckout } from '@a2seven/yoo-checkout';

// export const getYooKassaClient = (config: IYooCheckoutOptions) => {
//     const checkout = new YooCheckout(config);

//     return checkout;
// }

const checkout = new YooCheckout({
    shopId: process.env.YOUKASSA_SHOP_ID,
    secretKey: process.env.YOUKASSA_SECRET_KEY,
});

export default {
    yookassaClient: checkout,
}
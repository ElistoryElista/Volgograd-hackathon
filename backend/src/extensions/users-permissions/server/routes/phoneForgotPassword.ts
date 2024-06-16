export default {
    method: 'POST',
    path: '/auth/forgot-password/phone',
    handler: 'auth.phoneForgotPassword',
    config: { 
        // middlewares: [Array], 
        prefix: '' 
    }
}
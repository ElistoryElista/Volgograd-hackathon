export default {
    method: 'POST',
    path: '/auth/reset-password/phone',
    handler: 'auth.phoneResetPassword',
    config: { 
        // middlewares: [Array], 
        prefix: '' 
    }
}
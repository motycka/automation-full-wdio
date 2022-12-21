export const username = 'EMAIL';
export const password = 'PASSWORD!';
export const userFullName = 'NAME';

export function resolvePlaceholder(placeholderOrValue) {
    switch (placeholderOrValue) {
        case '@USERNAME@':
            return username;
        case '@PASSWORD@':
            return password;
        case '@ADMIN_USER@':
            return userFullName;
        default:
            return placeholderOrValue;
    }
}

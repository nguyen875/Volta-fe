export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    ADMIN: '/admin',

    // Admin
    // USERS: '/users',
    // PRODUCTS: '/products',
    // CATEGORIES: '/categories',
    // DISCOUNTS: '/discounts',
    // ORDERS: '/orders',
    // BUNDLES: '/bundles',

    // Customer
    // SHOP: '/shop',
    // CART: '/cart',
    // PROFILE: '/profile',
} as const;

export const ROUTE_LABELS = {
    [ROUTES.HOME]: 'Home',
    [ROUTES.LOGIN]: 'Login',
    [ROUTES.REGISTER]: 'Register',
    [ROUTES.ADMIN]: 'Admin',

    // Admin
    // [ROUTES.USERS]: 'Users',
    // [ROUTES.PRODUCTS]: 'Products',
    // [ROUTES.CATEGORIES]: 'Categories',
    // [ROUTES.DISCOUNTS]: 'Discounts',
    // [ROUTES.ORDERS]: 'Orders',
    // [ROUTES.BUNDLES]: 'Bundles',

    // Customer
    // [ROUTES.SHOP]: 'Shop',
    // [ROUTES.CART]: 'Cart',
    // [ROUTES.PROFILE]: 'Profile',
} as const;

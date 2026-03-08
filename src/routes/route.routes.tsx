import { ROUTES } from './route.constant';
import type { ReactNode } from 'react';

import { AdminScreen } from '../pages/screens/admin/admin.screen';

// Admin Screens (uncomment as implemented)
// import { UserScreen } from '../pages/screens/users/user.screen';
// import { ProductScreen } from '../pages/screens/products/product.screen';
// import { CategoryScreen } from '../pages/screens/categories/category.screen';
// import { DiscountScreen } from '../pages/screens/discounts/discount.screen';
// import { OrderScreen } from '../pages/screens/orders/order.screen';
// import { BundleScreen } from '../pages/screens/bundles/bundle.screen';

// Customer Screens (uncomment as implemented)
// import { ShopScreen } from '../pages/screens/shop/shop.screen';
// import { CartScreen } from '../pages/screens/cart/cart.screen';
// import { ProfileScreen } from '../pages/screens/profile/profile.screen';

export interface RouteConfig {
    path: string;
    component: React.ComponentType;
    label: string;
    icon?: ReactNode;
}

export const routes: RouteConfig[] = [
    { path: ROUTES.ADMIN,       component: AdminScreen,      label: 'Admin'      },

    // ── Admin ──
    // { path: ROUTES.USERS,       component: UserScreen,       label: 'Users'      },
    // { path: ROUTES.PRODUCTS,    component: ProductScreen,    label: 'Products'   },
    // { path: ROUTES.CATEGORIES,  component: CategoryScreen,   label: 'Categories' },
    // { path: ROUTES.DISCOUNTS,   component: DiscountScreen,   label: 'Discounts'  },
    // { path: ROUTES.ORDERS,      component: OrderScreen,      label: 'Orders'     },
    // { path: ROUTES.BUNDLES,     component: BundleScreen,     label: 'Bundles'    },

    // ── Customer ──
    // { path: ROUTES.SHOP,        component: ShopScreen,       label: 'Shop'       },
    // { path: ROUTES.CART,        component: CartScreen,        label: 'Cart'       },
    // { path: ROUTES.PROFILE,    component: ProfileScreen,     label: 'Profile'    },
];

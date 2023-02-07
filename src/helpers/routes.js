import DashboardPage from './../pages/DashboardPage'
import ProductsPage from '../pages/ProductsPage'
import CategoriesPage from '../pages/CategoriesPage'
import BannerPage from '../pages/BannerPage'
import BrandPage from '../pages/BrandPage'
import LoginPage from '../pages/LoginPage'
import AttributePage from '../pages/AttributePage'


export const routes = [ 
    {
        id: 1,
        path: '/',
        component: <DashboardPage />
    },
    {
        id: 2,
        path: '/products',
        component: <ProductsPage />
    },
    {
        id: 3,
        path: '/categories',
        component: <CategoriesPage />
    },
    {
        id: 4,
        path: '/banner',
        component: <BannerPage />
    },
    {   
        id: 5,
        path: '/brand',
        component: <BrandPage />
    },
    {
        id: 6,
        path: '/atribute',
        component: <AttributePage />
    },
    {
        id: 7,
        path: '/login',
        component: <LoginPage />
    },
]
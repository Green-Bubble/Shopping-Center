import { Route, Routes } from 'react-router-dom';
import Products from '@pages/Products';
import Login from '@pages/Login';
import SignUp from '@pages/SignUp';
import Product from '@view/pages/Product';
import NotFound from '@view/pages/NotFound';
import Recovery from '@view/pages/Recovery';
import Carts from '@view/pages/Carts';

const ProductsRouts = () => {
    return (
        <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/:id" element={<Product/>} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

const AppRoutes = () => {
    return (
        <Routes>
            <Route index element={<Products />} />
            <Route path="products/*" element={<ProductsRouts />} />
            <Route path="carts" element={<Carts />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="recovery" element={<Recovery />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
};

export default AppRoutes;
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";
// import "./assets/styles/bootstrap.custom.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import HomeScreen from "./screens/HomeScreen";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import MethodScreen from "./screens/MethodScreen";
import DetailsScreen from "./screens/DetailsScreen";
import PaymentScreen from "./screens/PaymentScreen";
import OrderScreen from "./screens/OrderScreen";
import MyOrdersScreen from "./screens/MyOrdersScreen";
import OrdersScreen from "./screens/Admin/OrdersScreen";
import UsersScreen from "./screens/Admin/UsersScreen";
import EditUserScreen from "./screens/Admin/EditUserScreen";
import ProductsScreen from "./screens/Admin/ProductsScreen";
import EditProductScreen from "./screens/Admin/EditProductScreen";
import EditVariantScreen from "./screens/Admin/EditVariantScreen";
import AddProductScreen from "./screens/Admin/AddProductScreen";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="" element={<PrivateRoute />}>
        <Route index={true} path="/" element={<HomeScreen />} />
        <Route path="/product/:id" element={<ProductScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/cart" element={<CartScreen />} />
        <Route path="/method" element={<MethodScreen />} />
        <Route path="/details" element={<DetailsScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/order/:id" element={<OrderScreen />} />
        <Route path="/myorders" element={<MyOrdersScreen />} />
      </Route>
      <Route path="" element={<AdminRoute />}>
        <Route path="/orders" element={<OrdersScreen />} />
        <Route path="/admin/users" element={<UsersScreen />} />
        <Route path="/users/:id" element={<EditUserScreen />} />
        <Route path="/admin/products" element={<ProductsScreen />} />
        <Route path="/admin/products/:id" element={<EditProductScreen />} />
        <Route path="/variant/:id" element={<EditVariantScreen />} />
        <Route path="/admin/product/add" element={<AddProductScreen />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

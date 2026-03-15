import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Order from './pages/Order';
import Login from './pages/admin/Login';
import AdminLayout from './pages/admin/AdminLayout';
import MenuManager from './pages/admin/MenuManager';
import OffersManager from './pages/admin/OffersManager';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'menu', element: <Menu /> },
      { path: 'contact', element: <Contact /> },
      { path: 'order', element: <Order /> },
    ],
  },
  {
    path: '/admin',
    children: [
      { index: true, element: <Login /> },
      {
        path: 'dashboard',
        element: <AdminLayout />,
        children: [
          { index: true, element: <MenuManager /> },
          { path: 'menu', element: <MenuManager /> },
          { path: 'offers', element: <OffersManager /> },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
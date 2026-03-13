import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home'; 
import Menu from './pages/Menu';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Order from './pages/Order';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, 
    children: [
      { index: true, element: <Home /> }, 
      { path: 'menu', element: <Menu /> },
      { path: 'contact', element: <Contact /> },
      { path: 'order', element: <Order />}
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
]);


export default function App() {
  return <RouterProvider router={router} />;
}
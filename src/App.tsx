import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home'; 
import Menu from './pages/Menu';
import Bulkorder from './pages/Bulkorder';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, 
    children: [
      { index: true, element: <Home /> }, 
      { path: 'menu', element: <Menu /> },
      { path: 'bulkorder', element: <Bulkorder /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> } 
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
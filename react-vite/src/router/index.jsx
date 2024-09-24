import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import CoffeeFormPage from '../components/CoffeeFormPage'
import Layout from './Layout';
import CoffeeContainer from '../components/CoffeeContainer';
import FavoritesPage from '../components/FavoritesPage/FavoritesPage';
import CoffeeDetailsPage from '../components/CoffeeDetailsPage/CoffeeDetailsPage';
import ManageCoffee from '../components/ManageCoffee/ManageCoffee';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <CoffeeContainer />
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "form",
        element: <CoffeeFormPage />
      },
//!----------------------Luna---------------------------
      {
        path: "coffees",
        children: [
          {
            path: ":id",
            element: <CoffeeDetailsPage />
          }
        ]
      },
//!----------------------Luna---------------------------
      //===========lalos router changes ============
      {
        path: 'favorites',
        element: <FavoritesPage />
      },
      {
        path: 'users-coffee',
        element: <ManageCoffee />
      }
      //===========lalos router changes ============
    ],
  },
]);

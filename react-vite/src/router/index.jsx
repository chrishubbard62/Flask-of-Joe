import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import CoffeeFormPage from '../components/CoffeeFormPage'
import Layout from './Layout';
import CoffeeContainer from '../components/CoffeeContainer';
import FavoritesPage from '../components/FavoritesPage/FavoritesPage';
import CoffeeDetailsPage from '../components/CoffeeDetailsPage/CoffeeDetailsPage';
import ManageCoffee from '../components/ManageCoffee/ManageCoffee';
import CartPage from '../components/CartPage';


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
        path: "cart",
        element: <CartPage />
      },
//? ///////////////////////////////////////////////////// chris //////////////////////
      // {
      //   path: "coffees/new",
      //   element: <CoffeeFormPage newCoffee={true}/>
      // },
      // {
      //   path: 'coffees/:id/edit',
      //   element: <CoffeeFormPage newCoffee={false}/>
      // },
//? ///////////////////////////////////////////////////// chris ///////////////////////
//!----------------------Luna---------------------------
      {
        path: "coffees",
        children: [
          {
            path: ":id",
            element: <CoffeeDetailsPage />
          },
          {
            path: "new",
            element: <CoffeeFormPage newCoffee={true}/>
          },
          {
            path: ':id/edit',
            element: <CoffeeFormPage newCoffee={false}/>
          },
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

import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import UploadPicture from '../components/UploadPicture/UploadPicture';
import FavoritesPage from '../components/FavoritesPage/FavoritesPage';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <UploadPicture />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      //===========lalos router changes ============
      {
        path: 'favorites',
        element: <FavoritesPage/>
      }
      //===========lalos router changes ============
    ],
  },
]);

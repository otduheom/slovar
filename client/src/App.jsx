import { useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router';
import ErrorPage from './components/pages/ErrorPage';
import MainPage from './components/pages/MainPage';
import Layout from './components/Layout';
import LoginPage from './components/pages/LoginPage';
import SignUpPage from './components/pages/SignUpPage';
import { useEffect } from 'react';
import axiosInstance, { setAccessToken } from '../src/shared/lib/axiosInstance';
import ProtectedRoute from './components/HOCs/ProtectedRoute';
import Profile from './components/pages/Profile';
import ModerationPage from './components/pages/ModerationPage';

function App() {
  const [user, setUser] = useState({ status: 'logging', data: null });

  useEffect(() => {
    axiosInstance('/auth/refreshTokens')
      .then((res) => {
        setUser({ status: 'logged', data: res.data.user });
        setAccessToken(res.data.accessToken);
      })
      .catch(() => {
        setUser({ status: 'guest', data: null });
        setAccessToken('');
      });
  }, []);
  const isAuthenticated = user?.status === 'logged';
  const isGuest = user?.status === 'guest';
  const isAdmin = user?.status === 'logged' && user?.data?.isAdmin;
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout user={user} setUser={setUser} />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element: <MainPage user={user} />,
        },
        {
          path: '/signup',
          element: (
            <ProtectedRoute isAllowed={isGuest} redirectTo="/">
              <SignUpPage setUser={setUser} />
            </ProtectedRoute>
          ),
        },
        {
          path: '/profile',
          element: (
            <ProtectedRoute isAllowed={isAuthenticated} redirectTo="/login">
              <Profile user={user} />
            </ProtectedRoute>
          ),
        },
        {
          path: '/login',
          element: (
            <ProtectedRoute isAllowed={isGuest} redirectTo="/">
              <LoginPage setUser={setUser} />
            </ProtectedRoute>
          ),
        },
        {
          path: '/moderation',
          element: (
            <ProtectedRoute isAllowed={isAdmin} redirectTo="/">
              <ModerationPage user={user} />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);
  if (user?.status === 'logging') {
    return;
  }
  return <RouterProvider router={router} />;
}

export default App;

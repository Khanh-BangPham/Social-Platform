import { RouteObject } from 'react-router-dom';
import ChatPage from './components/features/Chat';
import { MainLayout } from './components/layouts/MainLayout';
import { PATH } from './constants/path';
import { Home } from './pages';
import { Profile } from './pages/profile';

export const routes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: PATH.Profile,
        element: <Profile />,
      },
    ],
  },
  {
    element: <ChatPage />,
    path: PATH.Messenger,
  },
];

import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from '~/App';
import { store } from '~/app/store';
import PostsPage from '~/routes/PostsPage';
import UsersPage from '~/routes/UsersPage';
import '~/index.scss';

const container = document.getElementById('root');

if (!container) throw new Error('Could not find root element with id \'root\'');

const root = createRoot(container);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'posts',
        element: <PostsPage />,
      },
      {
        path: 'users',
        element: <UsersPage />,
      },
    ],
  },
]);

root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>,
  // </React.StrictMode>,
);

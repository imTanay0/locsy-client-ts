import { createBrowserRouter, RouterProvider} from 'react-router-dom';

import { HomePage } from './pages/Home/homePage';
import SignInPage from './pages/SignIn/SignInPage';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/signin",
      element: <SignInPage />
    }
  ])

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App

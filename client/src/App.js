import './App.css';
import Login from './Components/Login';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Register from './Components/Register';
import EnterOtp from './Components/EnterOtp';
import Profile from './Components/Profile';
import UpdateProfile from './Components/UpdateProfile';
import LoginWithOtp from './Components/LoginWithOtp';
import LoginWithOtpVerify from './Components/LoginWithOtpVerify';

// Define routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/otpVerify',
    element: <EnterOtp />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/updateUser',
    element: <UpdateProfile />
  },
  {
    path: '/loginwithotp',
    element: <LoginWithOtp />
  },
  {
    path: '/verifyotp',
    element: <LoginWithOtpVerify />
  },
])

// App component
function App() {
  return (
    <main>
      <RouterProvider router={router} ></RouterProvider>
    </main>
  );
}

export default App;

import './App.css'
import Home from './components/Home/Home.jsx';
import Login from './components/Login/Login.jsx';
import Signup from './components/Signup/Signup.jsx';
import PostJob from './components/Postjob/Postjob.jsx';
import ForgetPassword from './components/Login/forgetPassword.jsx';
import FindWork from './components/FindWork/FindWork.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from "../src/redux/store.js";
import { Provider } from 'react-redux';
import Auth from "./components/auth/Auth";
import ManageJob from './components/Postjob/ManageJob.jsx';
import ContactUs from './components/Contact/Contact.jsx';

function App() {

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <ToastContainer position="top-right" autoClose={3000} />
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/post-job"
              element={
                <Auth allowedRole="employer">
                  <PostJob />
                </Auth>
              }
            />
            <Route path='/manage-job' element={<ManageJob />} />
            
            <Route path="/find-work" element={
              <Auth allowedRole="worker"><FindWork /></Auth>} />
            <Route path="/forgetPassword" element={<ForgetPassword />} />
            <Route path='/contact' element={<ContactUs/>}></Route>

          </Routes>
        </BrowserRouter>
      </Provider>

    </>
  )
}

export default App

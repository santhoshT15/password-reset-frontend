import Header from  "./Components/Header"
import Login from  "./Components/Login"
import Register from "./Components/Signup"
import Dashboard from "./Components/Dashboard"
import ErrorPage from "./Components/ErrorPage"
import PasswordReset from "./Components/ResetPassword"
import ForgotPasword from "./Components/ForgetPaaaword"
import {Routes,Route} from "react-router-dom"

function App() {
  return (
   <>
   <Header />

   <Routes>

   <Route path = "/" element = {<Login />} />
   <Route path = "/register" element = {<Register />} />
   <Route path = "/dashboard" element = {<Dashboard />} />
   <Route path = "/password-reset" element = {<PasswordReset />} />
   <Route path = "/forgotpassword/:id/:token" element = {<ForgotPasword />} />
   <Route path = "*" element = {<ErrorPage />} />
   </Routes>

   
   </>
  );
}

export default App;
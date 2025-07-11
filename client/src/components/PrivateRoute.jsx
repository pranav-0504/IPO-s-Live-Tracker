// PrivateRoute.jsx
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  
    // LocalStorage se token ko get kiya hai
    // Agar token hai to children ko render karega, warna login page pe redirect karega
    const token = localStorage.getItem("token");

    return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

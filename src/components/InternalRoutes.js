import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginForm from "../pages/LoginForm";
import Dashboard from "../pages/Dashboard/Dashboard";

const InternalRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<LoginForm />} />
                <Route path="/dashboard" element={<Dashboard />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default InternalRoutes;
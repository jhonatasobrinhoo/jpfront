import {Route, Routes} from "react-router-dom";
import LoginForm from "../pages/LoginForm";
import Contacts from "../pages/Contacts/Contacts";
import DashboardContent from "../pages/Habits/Habits";
import React from "react";
import {ProtectedRoute} from "./ProtectedRoute";
import Dashboard from "./Dashboard";

const InternalRoutes = () => {
    return (
        <div>
            <Routes>
                <Route exact path="/" element={<LoginForm/>}/>
                <Route path="/dashboard" element={<Dashboard/>}>
                    <Route path="habits" element={
                        <ProtectedRoute>
                            <DashboardContent/>
                        </ProtectedRoute>}/>
                    <Route path="contacts" element={
                        <ProtectedRoute>
                            <Contacts/>
                        </ProtectedRoute>}/>
                </Route>
            </Routes>}
        </div>
    )
}

export default InternalRoutes;
import './App.css';
import "antd/dist/antd.min.css"
import 'react-calendar-heatmap/dist/styles.css';
import InternalRoutes from "./components/InternalRoutes";
import {AuthProvider} from "./contexts/auth/AuthContext";
import {BrowserRouter} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <InternalRoutes/>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;

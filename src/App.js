import './App.css';
import "antd/dist/antd.min.css"
import 'react-calendar-heatmap/dist/styles.css';
import InternalRoutes from "./components/InternalRoutes";
import {AuthProvider} from "./contexts/auth/AuthContext";
import {BrowserRouter, Router} from "react-router-dom";
import {useLayoutEffect, useState} from "react";
import {createBrowserHistory} from "history";

const CustomRouter = ({
                          basename,
                          children,
                          history,
                      }) => {

    const [state, setState] = useState({
        action: history.action,
        location: history.location,
    })

    localStorage.setItem('lastActiveRoute', state.location.pathname);

    // console.log(localStorage.getItem('lastActiveRoute'));

    useLayoutEffect(() => history.listen((data) => {
        console.log(data);
        setState(data);
    }), [history]);

    // console.log(state);

    return (
        <Router
            basename={basename}
            children={children}
            location={state.location}
            navigator={history} />
    )
}

function App() {

    const history = createBrowserHistory();

    return (
        <BrowserRouter>
            <AuthProvider>
                <InternalRoutes location={history.location}/>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;

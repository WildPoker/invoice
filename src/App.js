import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";

function App() {
  const routeData = [
    {
      id: 101,
      path: "/",
      exact: true,
      main: () => <Homepage />,
    },
    {
      id: 102,
      path: "/login",
      main: () => <Login />,
    },
    {
      id: 103,
      path: "/forgot-password",
      main: () => <ForgotPassword />,
    },
    {
      id: 104,
      path: "/dashboard",
      main: () => <Dashboard />,
    },
  ];
  return (
    <BrowserRouter>
      <Switch>
            {routeData.map(items => (
                <Route
                    key={items.id}
                    exact={items.exact}
                    path={items.path}
                    component={items.main}
                />
            ))}
            <Redirect to="/" />
        </Switch>
    </BrowserRouter>
  );
}

export default App;

import NLink from "next/link";

import Layout from "../components/layout";

import Home from "../screens/Home";
import Login from "../screens/Login";
import Register from "../screens/Register";

import { useSimpleSelector } from "simple-redux-js";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
  // Link
} from "react-router-dom";

import { SimpleProvider } from "simple-redux-js";

import Seo from "../components/seo";

import { RouterAnalytics } from "../config/track";

const defaultState = {
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null
};

const SafeHydrate = ({ children }) => {
  // console.log(typeof window === "undefined");
  return (
    <div suppressHydrationWarning>
      {typeof window !== "undefined" && children}
    </div>
  );
};

const App = () => {
  const token = useSimpleSelector("token");
  return (
    <Layout>
      <Seo title={"Main App"} />
      <div style={{ position: "fixed", top: 8, right: 8 }}>
        <NLink href="/">Landing Link</NLink>
      </div>
      <Router basename="/app">
        <Switch>
          <Route
            exact
            path="/register"
            render={() =>
              token ? (
                <Redirect to="/home" />
              ) : (
                <Layout>
                  <Register />
                </Layout>
              )
            }
          />
          <Route
            exact
            path="/login"
            render={() =>
              token ? (
                <Redirect to="/home" />
              ) : (
                <Layout>
                  <Login />
                </Layout>
              )
            }
          />
          <Route
            exact
            path="/home"
            render={() =>
              token ? (
                <Layout>
                  <Home />
                </Layout>
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
        </Switch>
        <RouterAnalytics />
      </Router>
    </Layout>
  );
};

export default function AppPage() {
  return (
    <SafeHydrate>
      <SimpleProvider initialState={defaultState}>
        <App />
      </SimpleProvider>
    </SafeHydrate>
  );
}

import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";

//pages
import AddVehicle from "./pages/AddVehicle";
import ViewCars from "./pages/ViewCars";
import SalesInvoice from "./pages/SalesInvoice";
import PurchaseCash from "./pages/PurchaseCash";
import PurchaseLease from "./pages/PurchaseLease";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Print from "./pages/Print";
import SingleCar from "./pages/SingleCar.js";
import Documents from "./pages/Documents.js";
import Documents1 from "./pages/PurchaseCashDoc";
import Documents2 from "./pages/PurchaseLeaseDoc";

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { grey, yellow } from "@material-ui/core/colors";

//auth route
import AuthRoute from "./util/AuthRoute";
import AuthProvider from "./util/AuthProvider";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

const THEME = createMuiTheme({
  typography: {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
  palette: {
    primary: {
      main: yellow["A700"],
    },
    secondary: {
      main: grey[50],
    },
    secondary1: {
      main: grey[900],
    },
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={THEME}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <AuthProvider>
            <BrowserRouter>
              <Switch>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <AuthRoute exact path="/" component={AddVehicle} />
                <AuthRoute path="/view-cars" component={ViewCars} />
                <AuthRoute path="/sales-invoice" component={SalesInvoice} />
                <AuthRoute path="/purchase-cash" component={PurchaseCash} />
                <AuthRoute path="/purchase-lease" component={PurchaseLease} />
                <AuthRoute path="/print" component={Print} />
                <AuthRoute path="/view_cars/:car" component={SingleCar} />
                <AuthRoute path="/documents" component={Documents} />
                <AuthRoute path="/documents1" component={Documents1} />
                <AuthRoute path="/documents2" component={Documents2} />

                <AuthRoute
                  path="/vehicle-handover-document"
                  component={Documents}
                />
                <AuthRoute
                  path="/sales-invoice-document"
                  component={Documents}
                />
                <AuthRoute
                  path="/vehicle-purchase-cash-document"
                  component={Documents}
                />
                <AuthRoute
                  path="/vehicle-purchase-lease-document"
                  component={Documents}
                />
              </Switch>
            </BrowserRouter>
          </AuthProvider>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;

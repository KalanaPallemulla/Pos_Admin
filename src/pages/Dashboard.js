import React from "react";
import { NavLink } from "react-router-dom";

import { app } from "../util/config";

//material ui
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DraftsIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";

//icons
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import { Button } from "@material-ui/core";

import logo from "../assets/logo.png";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    backgroundColor: "#F4DC00",
    [theme.breakpoints.up("sm")]: {
      zIndex: theme.zIndex.drawer + 1,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,

  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#151515",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  navlink: {
    textDecoration: "none",
    color: "#F4DC00",
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    maxWidth: "300px",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "150px",
    },
  },
  rightToolbar: {
    marginLeft: "auto",
    marginRight: -12,
  },
  button: {
    color: "black",
    [theme.breakpoints.up("sm")]: {
      marginRight: "20px",
    },
  },
}));

function Dashboard(props) {
  const { window, children } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List component="nav" aria-label="main mailbox folders">
        <NavLink to="/" className={classes.navlink}>
          <ListItem button>
            <ListItemIcon>
              <ShoppingCartIcon style={{ color: "#F4DC00" }} />
            </ListItemIcon>
            <ListItemText primary="Add Vehicle" />
          </ListItem>
        </NavLink>

        <NavLink to="/sales-invoice" className={classes.navlink}>
          <ListItem button>
            <ListItemIcon>
              <PeopleAltIcon style={{ color: "#F4DC00" }} />
            </ListItemIcon>
            <ListItemText primary="Sales Invoice" />
          </ListItem>
        </NavLink>

        <NavLink to="/purchase-cash" className={classes.navlink}>
          <ListItem button>
            <ListItemIcon>
              <MonetizationOnIcon style={{ color: "#F4DC00" }} />
            </ListItemIcon>
            <ListItemText primary="Purchase Cash" />
          </ListItem>
        </NavLink>

        <NavLink to="/purchase-lease" className={classes.navlink}>
          <ListItem button>
            <ListItemIcon>
              <MonetizationOnIcon style={{ color: "#F4DC00" }} />
            </ListItemIcon>
            <ListItemText primary="Purchase Lease" />
          </ListItem>
        </NavLink>

        <NavLink to="/view-cars" className={classes.navlink}>
          <ListItem button>
            <ListItemIcon>
              <MonetizationOnIcon style={{ color: "#F4DC00" }} />
            </ListItemIcon>
            <ListItemText primary="View Cars" />
          </ListItem>
        </NavLink>

        <NavLink to="/documents" className={classes.navlink}>
          <ListItem button>
            <ListItemIcon>
              <MonetizationOnIcon style={{ color: "#F4DC00" }} />
            </ListItemIcon>
            <ListItemText primary="Documents" />
          </ListItem>
        </NavLink>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>

          <img
            src={logo}
            alt="logo"
            className={classes.logo}
            style={{ flexGrow: 1 }}
          />

          <section className={classes.rightToolbar}>
            <Button
              className={classes.button}
              onClick={() =>
                app
                  .auth()
                  .signOut()
                  .then(() => {
                    props.history.push("/login");
                  })
                  .catch((err) => console.log(err))
              }
            >
              <b>Logout</b>
            </Button>
          </section>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}

export default Dashboard;

import React, { useState } from "react";
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
} from "@material-ui/core/";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircle from "@material-ui/icons/AccountCircle";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import { useAlert } from '../../contexts/alertN';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  estiloNavbar: {
    backgroundColor: "#880016",
    color: "#fff",
    boxShadow: "0 2px 5px 5px rgba(0, 0, 0, .3)",
    borderRadius: 30,
  },
  subMenuStyle: {
    padding: 40,
  },
  IconMenuStyle: {
    marginRight: 20,
  }
}));

function Navbar({ hideIcons }) {
  const { signed, signOut } = useAuth();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { setAbrir, setMsg } = useAlert();

  const history = useHistory();
  function handleNavigateToCart() {
    history.push("/mcdonuts/carrinho");
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleToLogin = () => {
    history.push("/mcdonuts/login");
  };

  const handleToProfile = () => {
    history.push("/mcdonuts/perfil");
  };
  const handleToHome = () => {
    history.push("/mcdonuts");
  };

  function notificacaoSair() {
    setMsg('Logout efetuado com sucesso!');
    setAbrir(true);
  }

  const handleMenuSignOut = (event) => {
    signOut();
    notificacaoSair();
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.estiloNavbar}>
        <Toolbar>
          <Avatar src="https://scontent-gig2-1.xx.fbcdn.net/v/t1.0-9/116713815_124951775960325_7453113145449815266_n.jpg?_nc_cat=102&_nc_sid=85a577&_nc_ohc=mQdSHbahKnAAX8uDfzF&_nc_ht=scontent-gig2-1.xx&oh=92557106d94984dbbbb8d4f954c84f27&oe=5FB125BB" />
          <Typography
            variant="button"
            onClick={handleToHome}
            className={classes.title}
          >
            <h3>
              Mc Donuts
            </h3>
          </Typography>
          {!hideIcons && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={handleNavigateToCart}
              >
                <ShoppingCartIcon />
              </IconButton>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={signed ? handleMenu : handleToLogin}
              >
                <AccountCircle />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
                className={classes.subMenuStyle}
              >
                <MenuItem onClick={handleToProfile}>
                  <AccountCircle className={classes.IconMenuStyle} /> Perfil
                </MenuItem>
                <MenuItem onClick={handleMenuSignOut}>
                  <ExitToAppIcon className={classes.IconMenuStyle} /> Sair
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;

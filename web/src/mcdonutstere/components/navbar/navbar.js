import React from 'react';
import {
    makeStyles,
    AppBar,
    Toolbar,
    Typography,
    IconButton
} from '@material-ui/core/';
import { useHistory } from 'react-router-dom'
import AccountCircle from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';


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
        backgroundColor: '#880016',
        color: '#fff',
        boxShadow: '0 2px 5px 5px rgba(0, 0, 0, .3)',
        borderRadius: 30,
    },
}));


function Navbar({ hideIcons }) {
    const classes = useStyles();

    const history = useHistory();
    function handleNavigateToCart() {
        history.push("/mcdonuts/carrinho");
    }


    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.estiloNavbar}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Mc Donuts
                    </Typography>
                    {
                        !hideIcons && (
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
                                >
                                    <AccountCircle />
                                </IconButton>
                            </div>
                        )
                    }
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Navbar;
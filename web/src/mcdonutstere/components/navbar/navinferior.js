import React from 'react';
import {
    makeStyles,
    Paper,
    Tabs,
    Tab,
    Box,
} from '@material-ui/core/';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

const useStyles = makeStyles({
    root: {
        width: '90%',
        maxWidth: 700,
        boxShadow: '0 2px 5px 5px rgba(0, 0, 0, .3)',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: '#fffdeb',
    },
    root2: {
        position: 'fixed',
        width: '90%',
        bottom: 0,
        zIndex: 3,
    }
});

function NavInferior(disabledCarrinho) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box justifyContent="center" flexWrap="wrap" display="flex" className={classes.root2}>
            <Paper square className={classes.root}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="fullWidth"
                    indicatorColor="secondary"
                    textColor="secondary"
                >
                    {
                        disabledCarrinho ? (<>
                            <Tab icon={<ShoppingCartIcon />} disabled />
                            <Tab icon={<ShoppingBasketIcon />} />
                        </>
                        ) : (
                                <>
                                    <Tab icon={<ShoppingCartIcon />} />
                                    <Tab icon={<ShoppingBasketIcon />} disabled />
                                </>
                            )
                    }
                </Tabs>
            </Paper>
        </Box>
    );
}

export default NavInferior;
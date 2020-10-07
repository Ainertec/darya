import React from 'react';
import {
    makeStyles,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
    Button
} from '@material-ui/core/';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';


const useStyles = makeStyles({
    root: {
        maxWidth: 160,
        margin: 5,
        boxShadow: '0 2px 5px 5px rgba(0, 0, 0, .3)',
        borderRadius: 20,
    },
    precoestilo: {
        backgroundColor: '#880016',
        color: '#fff',
    },
    botaoestilo: {
        borderRadius: 30,
    },
});


function Item(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="90"
                    image="data:image/jpeg;base64,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"
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="p">
                        {props.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className={classes.precoestilo}>
                <Typography gutterBottom variant="h6" component="h6">
                    R${(props.price).toFixed(2)}
                </Typography>
                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    className={classes.botaoestilo}
                    onClick={() => alert(props.id)}
                >
                    <AddShoppingCartIcon />
                </Button>
            </CardActions>
        </Card>
    );
}

export default Item;
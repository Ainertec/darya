import React from "react";
import {
    makeStyles,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
    Button,
} from "@material-ui/core/";
import Visibility from "@material-ui/icons/Visibility";

const useStyles = makeStyles({
    root: {
        maxWidth: 160,
        margin: 5,
        boxShadow: "0 2px 5px 5px rgba(0, 0, 0, .3)",
        borderRadius: 10,
    },
    precoestilo: {
        backgroundColor: "#000",
        color: "#fff",
    },
    botaoestilo: {
        borderRadius: 10,
    },
});

export default function Item({ data }) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="90"
                    image={data.linkImg}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="p">
                        {data.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {data.regiao}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className={classes.precoestilo}>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    className={classes.botaoestilo}
                    onClick={() => console.log('ola')}
                    value={true}
                >
                    <Visibility /> Visitar
                </Button>
            </CardActions>
        </Card>
    );
}

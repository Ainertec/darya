import React from 'react';
import {
  makeStyles,
  Container,
  AppBar,
  Toolbar,
  Box,
  Typography
} from '@material-ui/core/';
import Item from './item';


const Link = [
  {
    id: 1,
    linkImg: "https://scontent-gig2-1.xx.fbcdn.net/v/t1.0-9/116713815_124951775960325_7453113145449815266_n.jpg?_nc_cat=102&_nc_sid=85a577&_nc_ohc=mQdSHbahKnAAX8uDfzF&_nc_ht=scontent-gig2-1.xx&oh=92557106d94984dbbbb8d4f954c84f27&oe=5FB125BB",
    name: "Mc Donuts",
    regiao: "Teresópolis",
    linkNav: "#"
  }
]


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  styleNavbar: {
    backgroundColor: '#000',
    borderRadius: 30,
    boxShadow: "0 2px 5px 5px rgba(0, 0, 0, .3)",
  },
  img: {
    overflow: 'hidden',
    display: 'block',
    width: '60%',
    margin: 10,
    borderRadius: 10,
    boxShadow: "0 2px 5px 5px rgba(0, 0, 0, .3)",
  },
}));

export default function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.styleNavbar}>
        <Toolbar>
          Bem vindo!
            </Toolbar>
      </AppBar>
      <Container maxWidth="md" disableGutters>
        <Box
          justifyContent="center"
          flexWrap="wrap"
          display="flex"
        >
          <img
            className={classes.img}
            src="https://lh3.googleusercontent.com/pw/ACtC-3efWTYviDcllX28UkgPugk1LA1HE9qB76W7rHTUO_X4-coepBr1Kk9c_IOAKLDfaWILUHkYiVmsnIdxqwSd1iHKP1Ucc-nWlGlaDunvT8PFVvPuCBejnYhmGLEWfUJRf61f8w-yhqNv3kgGLefNPibb=w960-h720-no?authuser=0"
          />
        </Box>
        <Typography variant="h6" gutterBottom style={{ textAlign: 'center', marginTop: 30, marginBottom: 30, }}>
          Aqui você encontra os melhores estabelecimentos
      </Typography>
        <Box
          justifyContent="center"
          flexWrap="wrap"
          display="flex"
        >
          {Link.map((item) => (
            <Item key={item.id} data={item} />
          ))}
        </Box>
      </Container>
    </div>
  );
}
import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

function App() {

  const classes = useStyles();

  return (
    <Container maxWidth="xl">
      <header>
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar variant="dense">
              <Typography variant="h6" color="inherit">
                Photos
                </Typography>
            </Toolbar>
          </AppBar>
        </div>
      </header>
      <main>
        <Grid container spacing={3}>
          <Grid item xs={12}>

          </Grid>
        </Grid>
      </main>
      <footer>

      </footer>
    </Container>
  );
}

export default App;

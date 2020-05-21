import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';


import './style.scss';
import { CssBaseline, Container } from '@material-ui/core';

// https://medium.com/@ryandrewjohnson/adding-multi-language-support-to-your-react-redux-app-cf6e64250050

export default function Main(props) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Box marginTop={1} />
      <Container>
        <main>
          <Grid>
            <Typography variant="h6" gutterBottom>
              Python Create
            </Typography>
            <Divider />
            {props.children}
          </Grid>
        </main>
      </Container>
    </React.Fragment>
  );
}

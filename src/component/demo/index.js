import { Box, Container, Card, CardContent, Typography, Divider, Grid } from '@material-ui/core';

const Dashboard = () => {

  return (
    <Box
      paddingY={3}
      style={{
        backgroundColor: 'background.default',
        minHeight: '100%',
      }}
    >
      <Container maxWidth="xl">
        <Card>
          <CardContent>
            <Grid
              container
              wrap="wrap"
            >
              <Grid
                item
                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: "85vh" }}
                xs={12}
              >
                <Typography
                  color="textPrimary"
                  gutterBottom
                  variant="h3"
                >
                  Congratulations You re now a part of Arenthis family
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
        </Card>
      </Container>
    </Box>
  );
}

export default Dashboard;

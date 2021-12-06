import { Box, Container, Card, CardContent, Typography, Divider, Grid } from '@material-ui/core';
import Loader from "react-loader-spinner";

const DashboardLoader = () => { 

    return (
        <Box paddingY={3} style={{ backgroundColor: 'background.default', minHeight: '100%' }}>
            <Container maxWidth="xl">
                <Card>
                    <CardContent>
                        <Grid
                            container
                            wrap="wrap"
                        >
                            <Grid
                                item
                                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: "78vh" }}
                                xs={12}
                            >
                                <Typography
                                    color="textPrimary"
                                    gutterBottom
                                    variant="h3"
                                >
                                    <Loader type="Circles" color="#263238" height={30} width={30} />
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

export default DashboardLoader;

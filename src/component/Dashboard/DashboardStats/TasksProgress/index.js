import { Avatar, Box, Card, CardContent, Grid, Typography, LinearProgress, } from '@material-ui/core';
import { orange } from '@material-ui/core/colors';
import { InsertChart } from '@material-ui/icons'; 

const TasksProgress = () => (
    <Card style={{ height: '100%' }}>
        <CardContent>
            <Grid
                container
                spacing={3}
                style={{ justifyContent: 'space-between' }}
            >
                <Grid item>
                    <Typography
                        color="textSecondary"
                        gutterBottom
                        variant="h6"
                    >
                        PROGRESS
            </Typography>
                    <Typography
                        color="textPrimary"
                        variant="h3"
                    >
                        75.5%
            </Typography>
                </Grid>
                <Grid item>
                    <Avatar
                        style={{
                            backgroundColor: orange[600],
                            height: 56,
                            width: 56
                        }}
                    >
                        <InsertChart />
                    </Avatar>
                </Grid>
            </Grid>
            <Box paddingTop={5}>
                <LinearProgress
                    value={75.5}
                    variant="determinate"
                />
            </Box>
        </CardContent>
    </Card>
);

export default TasksProgress;

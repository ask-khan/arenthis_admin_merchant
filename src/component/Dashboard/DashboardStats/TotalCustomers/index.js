import {
    Avatar,
    Box,
    Card,
    CardContent,
    Grid,
    Typography
} from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import { green } from '@material-ui/core/colors';

const TotalCustomers = () => (
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
                        CUSTOMERS
                    </Typography>
                    <Typography
                        color="textPrimary"
                        variant="h3"
                    >
                        16,000
                    </Typography>
                </Grid>
                <Grid item>
                    <Avatar
                        style={{
                            backgroundColor: green[600],
                            height: 56,
                            width: 56
                        }}
                    >
                        <PeopleIcon />
                    </Avatar>
                </Grid>
            </Grid>
            <Box
                paddingTop={3}
                style={{ display: 'flex', alignItems: 'center' }}>
                <ArrowUpwardIcon style={{ color: green[900] }} />
                <Box marginRight={1}>
                    <Typography
                        style={{ color: green[900] }}
                        variant="body2"
                    >
                        16%
                </Typography>
                </Box>
                <Typography
                    color="textSecondary"
                    variant="caption"
                >
                    Since last month
                </Typography>
            </Box>
        </CardContent>
    </Card>
);

export default TotalCustomers;

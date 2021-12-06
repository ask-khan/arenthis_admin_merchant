import {
    Avatar,
    Box,
    Card,
    CardContent,
    Grid,
    Typography
} from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import MoneyIcon from '@material-ui/icons/Money';
import { red } from '@material-ui/core/colors';

const Budget = () => (
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
                        BUDGET
            </Typography>
                    <Typography
                        color="textPrimary"
                        variant="h3"
                    >
                        $24,000
            </Typography>
                </Grid>
                <Grid item>
                    <Avatar
                        style={{
                            backgroundColor: red[600],
                            height: 56,
                            width: 56
                        }}
                    >
                        <MoneyIcon />
                    </Avatar>
                </Grid>
            </Grid>
            <Box
                paddingTop={3}
                style={{ display: 'flex', alignItems: 'center' }}>
                <ArrowDownwardIcon style={{ color: red[900] }} />
                <Box marginRight={1}>
                <Typography
                    style={{ color: red[900]}}
                    variant="body2"
                >
                    12% 
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

export default Budget;

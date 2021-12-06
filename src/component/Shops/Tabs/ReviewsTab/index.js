import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import { Divider, Typography } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import { Pagination } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({

    gridcon: {
        borderRadius: 4,
        padding: theme.spacing(2, 0),
        margin: theme.spacing(2, 0),
    },

    linearprgcon: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: theme.spacing(0, 2),
    },

    ratingcon: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },

    ratingsubcon: {
        padding: "5px 0px",
    },

    progressStyle: {
        height: "10px",
    },

    heading: {
        fontFamily: "sans-serif",
    },

    titlcon: {
        width: "5%",
    },

    linearcon: {
        width: "95%",
    },

    cardwrapper: {
        borderRadius: "4px !important",
    },

    cardcon: {
        width: "100%",
        borderRadius: "0px !important",
        paddingBottom: theme.spacing(2),
    },

    crouselcon: {
        width: "100% !important",
    },

    paginationcon: {
    },

}));

const ReviewsTab = () => {

    const classes = useStyles();

    const reviews = ["Stokes", "Root", "Anderson", "Jimmy", "Denly", "Morgan",];

    const linearProgressbar = [
        {
            title: 5,
            progress: 80
        },
        {
            title: 4,
            progress: 60
        },
        {
            title: 3,
            progress: 50
        },
        {
            title: 2,
            progress: 40
        },
        {
            title: 1,
            progress: 30
        },
    ];

    const itemsPerPage = 2;
    const [page, setPage] = useState(1);
    const [noOfPages] = useState(
        Math.ceil(reviews.length / itemsPerPage)
    );

    const handleChange = (event, value) => {
        setPage(value);
    };

    return (
        <div>
            <Box
                component={Grid}
                container
                boxShadow={3}
                marginY={3}
            >
                <Grid container className={classes.gridcon}>
                    <Grid item xs={12} sm={12} md={4}>
                        <div className={classes.ratingcon}>
                            <div className={classes.ratingsubcon}>
                                <h2 className={classes.heading}>4.2</h2>
                            </div>
                            <div className={classes.ratingsubcon}>
                                <Box component="fieldset" borderColor="transparent">
                                    <Rating name="half-rating-read" defaultValue={4.5} precision={0.5} readOnly />
                                </Box>
                            </div>
                            <div className={classes.ratingsubcon}>
                                <Typography>
                                    52,00
                            </Typography>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8}>
                        <>
                            {linearProgressbar?.map((item, index) => (
                                <div key={index} className={classes.linearprgcon}>
                                    <div className={classes.titlcon}>
                                        <Typography>
                                            {item.title}
                                        </Typography>
                                    </div>
                                    <div className={classes.linearcon}>
                                        <LinearProgress variant="determinate" value={item.progress} className={classes.progressStyle} />
                                    </div>
                                </div>
                            ))}
                        </>
                    </Grid>
                </Grid>
            </Box>

            <Box
                component={Grid}
                container
                boxShadow={3}
                marginY={3}
            >
                <Grid container className={classes.cardwrapper}>

                    {reviews
                        ?.slice((page - 1) * itemsPerPage, page * itemsPerPage)
                        ?.map((value, index) => (
                            <Card key={index} className={classes.cardcon} elevation={0}>
                                <CardHeader
                                    key={index}
                                    avatar={
                                        <Avatar aria-label="recipe" className={classes.avatar}>
                                            {value.charAt(0)}
                                        </Avatar>
                                    }
                                    title={`${value}`}
                                    subheader={<Rating name="half-rating-read" defaultValue={4.5} precision={0.5} readOnly />}
                                />
                                <CardContent>
                                    <Typography variant="body2">
                                        Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                                        minutes.
                                    </Typography>
                                </CardContent>

                            </Card>
                        ))}
                    <Divider />

                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justify="center"
                        className={classes.paginationcon}
                    >

                        <Box paddingY={2}>
                            <Pagination
                                count={noOfPages}
                                page={page}
                                onChange={handleChange}
                                defaultPage={1}
                                color="primary"
                                size="large"
                            // showFirstButton
                            // showLastButton
                            />
                        </Box>

                    </Grid>

                </Grid>
            </Box>

        </div>
    );
};

export default ReviewsTab;

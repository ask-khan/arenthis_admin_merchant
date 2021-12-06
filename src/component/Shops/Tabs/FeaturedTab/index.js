import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Button, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import FeaturedModal from './FeaturedModal';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { useSelector } from 'react-redux';
import { GridContextProvider, GridDropZone, GridItem, swap, move } from "react-grid-dnd";
import "./style.css";

const useStyles = makeStyles((theme) => ({

    root: {
        height: "100%",
    },

    cardcon: {
        padding: "30px 0px !important"
    },
    card: {
        margin: theme.spacing(0, 1),
    },
    media: {
        height: "200px !important",
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    createbtncon: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-end",
    },
    cardactioncon: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-end",
    },
}));

const FeaturedTab = () => {

    const left = [];

    // state
    const [items, setItems] = useState({ left });
    const [modalOpen, setModalOpen] = useState(false);

    // Access MUI Style
    const classes = useStyles();

    const handleOpen = () => {
        setModalOpen(true);
    };
    const handleClose = () => {
        setModalOpen(false);
    };

    const onChange = (sourceId, sourceIndex, targetIndex, targetId) => {

        if (targetId) {
            const result = move(
                items[sourceId],
                items[targetId],
                sourceIndex,
                targetIndex
            );
            return setItems({
                ...items,
                [sourceId]: result[0],
                [targetId]: result[1]
            });
        }

        const result = swap(items[sourceId], sourceIndex, targetIndex);
        // console.log("result", result)
        return setItems({
            ...items,
            [sourceId]: result
        });
    }

    // ***************************Redux Steat***************************
    const fileUrl = useSelector((state) => state.fileUrl)
    const { success, filesArray } = fileUrl;

    // ***************************useEffect***************************
    useEffect(() => {
        if (success) {
            const updatedItems = filesArray.map((val, index) => (
                { id: `${index + 1}`, img: filesArray[index] }
            ));

            setItems({
                ...items,
                left: updatedItems
            });

        }
    }, [filesArray]);

    return (

        <>

            <div className={classes.root}>
                <Grid container spacing={3}>
                    <div className={classes.createbtncon}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            className={classes.button}
                            endIcon={<AddIcon />}
                            onClick={handleOpen}
                        >
                            Create
                   </Button>
                    </div>

                    <div>
                        <FeaturedModal isModalOpen={modalOpen} handleClose={handleClose} />
                    </div>

                </Grid >
            </div >
            <div style={{ height: "120vh" }}>
                {items.left.length > 0 &&
                    <GridContextProvider onChange={onChange}>
                        <div className="container">
                            <GridDropZone
                                className="dropzone left"
                                id="left"
                                boxesPerRow={3}
                                rowHeight={300}
                            >
                                {items.left.map(item => (
                                    <GridItem key={item.name} >
                                        {/* <div className="grid-item">
                                            <div className="grid-item-content"> */}
                                        <div className={classes.cardcon}>
                                            <Card className={classes.card}>
                                                <CardMedia
                                                    className={classes.media}
                                                    image={item.img}
                                                />

                                                {/* <CardContent>
                                                            <Typography variant="body2" color="textSecondary" component="p">
                                                                {item.id}
                                                            </Typography>
                                                        </CardContent> */}
                                                <CardActions disableSpacing className={classes.cardactioncon}>
                                                    <IconButton>
                                                        <DeleteOutlineIcon />
                                                    </IconButton>
                                                </CardActions>
                                            </Card>
                                        </div>
                                        {/* </div>
                                        </div> */}
                                    </GridItem>
                                ))}
                            </GridDropZone>
                        </div>
                    </GridContextProvider>
                }
            </div>

        </>
    );

}

export default FeaturedTab;

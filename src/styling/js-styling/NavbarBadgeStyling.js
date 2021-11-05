import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    typography: {
        padding: theme.spacing(2),
    },
    paper: {
        height: "230px",
        width: "70%",
        margin: "auto",
        marginTop: "30px"
    },
    collapse: {
        marginLeft: "800px",
        position: "absolute",
        zIndex: 1
    },
    ageInput: {
        marginLeft: "150px"
    },
    ageContainer: {
        float: "left"
    },
    reserveBtn: {
        marginRight: "5px",
        marginBottom: "5px"
    },
    errorIcon: {
        color: "orange"
    },
    bookingCardDetailsPaper: {
        height: "230px",
        width: "15%",
        marginTop: "30px",
        marginRight: "55px"
    },
    removeButton: {
        maxWidth: "20px",
        maxHeight: "20px",
        minWidth: "20px",
        minHeight: "20px",
        marginLeft: "5px"
    },
    carRentalIcon: {
        width: "220px !important",
        height: "220px !important",
        margin: "auto"
    }
}));
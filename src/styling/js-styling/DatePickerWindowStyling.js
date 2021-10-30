import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        borderRadius: "25px",
        border: "0.5px solid black",
    },
    container: {
        // display: 'flex',
        flexWrap: 'wrap',
        textAlign: "middle"
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 150,
        margin: "10px"
    },
    bookingButton: {
        marginTop: "10px"
    },
    errorText: {
        color: "red"
    },
    backToCommunity: {
        float: "left",
        marginBottom: "20px"
    },
    noPeople: {
        width: "100px !important",
        height: "100px !important",
        marginBottom: "20px !important"
    }
}));
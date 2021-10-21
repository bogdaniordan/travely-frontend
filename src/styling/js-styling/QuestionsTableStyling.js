import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    infoIcon: {
        color: "orange"
    },
    minusButton: {
        marginRight: "10px"
    },
    paper: {
        width: "90%",
        height: "200px",
        margin: "auto"
    },
    updatePaper: {
        // height: "800px",
        margin: "auto",
        textAlign: "left",
        width: "80%",
        overflow: "auto",
        marginBottom: "100px"
    },
    updateContainer: {
        margin: "auto",
        fontWeight: "bold",
        marginBottom: "100px"
    },
    updateSubmitBtn: {
        float: "left",
        marginLeft: "15px"
    },
    updateBackBtn: {
        float: "right"
    },
    carAvatar: {
        width: "200px",
        height: "200px"
    },
    gotToProfileButton: {
        marginTop: "25px"
    },
    statsIcon: {
        height: "50px",
        width: "50px"
    }
});

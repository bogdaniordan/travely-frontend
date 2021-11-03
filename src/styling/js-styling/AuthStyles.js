import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        // margin: theme.spacing(1)
        margin: "auto",
        backgroundColor: theme.palette.secondary.main,
        marginBottom: "30px"
    },
    container: {
        borderRadius: "25px",
        position: "absolute",
        width: "500px",
        margin: "auto",
        overflow: "auto"
    },
    cityCardPaper: {
        margin: "60px"
    },
    cityCardListItem: {
        height: "120px"
    },
    cityCardAvatar: {
        height: "70px",
        width: "70px"
    },
    left: {
        textAlign: "left"
    },
    exitButton: {
        maxWidth: "30px",
        maxHeight: "30px",
        minWidth: "30px",
        minHeight: "30px"
    },
    loginContainer: {
        marginBottom: "100px"
    },
    checkBtn: {
        display: "none"
    },
    sign: {
        margin: "10px"
    },
    resetPassPaper: {
        width: "600px",
        borderRadius: "20px",
        margin: "auto",
        position: "absolute",
        overflow: "auto"
    },
    resetPassAvatar: {
        margin: "auto",
        marginTop: "50px",
        backgroundColor: theme.palette.secondary.main,
    },
    compareBtn: {
        marginTop: "5px",
        float: "right"
    },
    statsIcon: {
        height: "50px !important",
        width: "50px !important"
    },
    otherUserProfile: {
        width: "150px",
        height: "150px",
        position: "absolute",
        marginLeft: "150px",
        zIndex: 2,
        marginTop: "150px"
    }
}));
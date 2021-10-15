import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    container: {
        borderRadius: "25px",
        position: "absolute",
        width: "500px",
        height: "700px",
        margin: "auto"
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
    }
}));
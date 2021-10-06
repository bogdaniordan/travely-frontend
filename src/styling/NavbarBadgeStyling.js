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
        margin: "auto"
    },
    collapse: {
        marginLeft: "800px"
    }
}));
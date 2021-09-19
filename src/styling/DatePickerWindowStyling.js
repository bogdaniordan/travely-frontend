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
}));
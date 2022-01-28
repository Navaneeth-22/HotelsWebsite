import { CircularProgress, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles<Theme,{}>({
    container:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        position: "fixed",
        left: "0px",
        top: "0px",
        width: "100%",
        ZIndexProperty : "9999"

    }
})

export default function LoadingSpinner(){
    const styles = useStyles();
    return(
    <div className={styles.container}>
    <CircularProgress />
    </div>
    );
}
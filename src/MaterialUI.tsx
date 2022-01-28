import {CircularProgress, TextField, Typography,Theme, Card, CardMedia, CardContent} from "@material-ui/core"
import { makeStyles } from "@material-ui/core"


interface IMaterialUI{
    labelColor:string;
    font:string;
}
const useStyles = makeStyles<Theme,IMaterialUI>({

    root:{
        color: (props) => props.labelColor,
    }
})

export default function MaterialUI(){
   const styles= useStyles({labelColor:"red",font:"40px"});
    return(
       <>
        <CircularProgress/>

        <Typography variant="h4" gutterBottom component="div" className={styles.root}>
        h4. Heading
      </Typography>

      <Card>
          <CardMedia
             component="img"
            height="194"
            image="https://www.zomato.com/HauzKhasSocial/photos?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1#tabtop"
       
          />
          <CardContent>
          <Typography variant="body2" color="primary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography>
          </CardContent>
      </Card>
      </>
        );
}
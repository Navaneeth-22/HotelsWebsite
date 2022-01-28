import {
  Card,
  CardContent,
  CardMedia,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { IHotels } from "./HotelSlice";
const UseStyles = makeStyles<Theme, {}>({
  cardComponent: {
    margin: "2px",
    //borderRadius: "5%",
    backgroundColor: "rgba(0,0,0,0.25)",
    borderColor: "solid 10px rgba(255,255,255)",
    height: "410px",
    transition: "filter 0.1s",

    "&:hover": {
      filter: "drop-shadow(8px 8px 0.75rem #3500D3)",
    },
  },
  fontTypo: {
    color: "white",
    fontFamily: "Lobster, cursive",
    fontSize: "1.5rem",
  },
});
export default function HotelCard(x: IHotels) {
  const styles = UseStyles();
  return (
    <Card className={styles.cardComponent}>
      <CardMedia
        component="img"
        height="250"
        image={x.featured_image}
        alt={x.name}
      />
      <CardContent>
        <Typography variant="body2" className={styles.fontTypo}>
          {x.cuisines}
        </Typography>
        <Typography variant="body2" className={styles.fontTypo}>
          {x.name}
        </Typography>
      </CardContent>
    </Card>
  );
}

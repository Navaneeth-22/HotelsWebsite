import {
  AppBar,
  Button,
  Container,
  Grid,
  InputBase,
  Theme,
  useMediaQuery,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/styles";
import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fromEvent } from "rxjs";
import { AppState } from "./AppState";
import HotelCard from "./HotelCard";
import { completed, IHotels, started } from "./HotelSlice";
import svgImage from "./layered-waves-haikei.svg";
import { userContext } from "./UserProvider";
interface IRestaurant {
  restaurant: IHotels;
}

const useStyles = makeStyles<Theme, {}>({
  navBarImageAndBackground: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    backgroundColor: "black",

    //  filter: "drop-shadow(8px 8px 0.75rem brown)",
  },
  navBarImage2AndBackground: {
    width: "100%",
    height: "auto",
    objectFit: "cover",
    // backgroundColor:"black",
  },
  navBarTransparent: {
    background: "transparent",
    color: "black",
  },
  navBar: {
    backgroundColor: "rgba(0,0,0,0.95)",
    width: "100%",
  },
  bodyBackground: {
    backgroundColor: "black",
    padding: 0,
    margin: 0,
    width: "100%",
    height: "100%",
    textAlign: "center",
  }, //rgba(26,32,39,1)

  gridContainer: {
    width: "100vw",
    marginTop: "-8px",
    marginBottom: "-8px",
    marginLeft: "0px",
    marginRight: "0px",
    padding: "70px 20px 20px 20px",
    backgroundColor: "black",
  },
  AppBarFont: {
    margin: "0 5px 0 5px",
    color: "white",
    fontFamily: "Lobster, cursive",
    fontSize: "1.5rem",
    transition: "background 0.5s 0s ease",
    "&:hover": {
      background: "rgba(0,0,5,0.25)",
    },
    pointerEvents: "all",
  },
  appBarfont2: {
    margin: "0 5px 0 5px",
    color: "black",
    fontFamily: "Lobster, cursive",
    fontSize: "1.5rem",
    backgroundColor: "rgba(255,255,255,0.55)",
    transition: "background 0.5s 0s ease",
    "&:hover": {
      background: "rgba(0,0,0,0.25)",
    },
    pointerEvents: "all",
  },
  fontTypo: {
    color: "white",
    fontFamily: "Lobster, cursive",
    fontSize: "2.5rem",
    backgroundColor: "black",
    marginTop: "-10px",
    paddingTop: "20px",
  },
  searchNav: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  ButtonsBar: {
    display: "flex",
    justifyContent: "space-evenly",
  },

  searchInput: {
    display: "flex",
    alignItems: "center",
    flexGrow: 0.9,
    backgroundColor: "rgba(0,0,0,0.25)",
    borderRadius: "5rem",
  },
  searchiconp: {
    margin: "0 8px",
  },
  inputbase: {
    color: "white",
  },
  headerText: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontFamily: "Lobster, cursive",
    fontSize: "3.5rem",
    background: "-webkit-linear-gradient(#c4deff, #333)",
    "-webkit-backgroundClip": "text",
    "-webkit-text-fill-color": "transparent",
  },
  headerText2: {
    position: "absolute",
    top: "20%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontFamily: "Lobster, cursive",
    fontSize: "2.5rem",
    background: "-webkit-linear-gradient(#eee, #333)",
    "-webkit-backgroundClip": "text",
    "-webkit-text-fill-color": "transparent",
  },
});

export default function HotelsUI() {
  const context = useContext(userContext);
  const styles = useStyles();
  const isActive = useMediaQuery("(max-width:950px)");
  const isActive2 = useMediaQuery("(max-width:700px)");
  const dispatch = useDispatch();
  const hotels: IHotels[] = useSelector((x: AppState) => x.HotelSlice);
  const [navbar, setnavbar] = useState("navBarTransparent");
  const history = useHistory();
  const [searchInput, setSearchInput] = useState<string>("");
  //Making NavBar Transition using useEffect and addEventListener
  /* useEffect(()=>{
      const changeOnScroll=() =>{
        console.log(window.scrollY+"height is"+window.innerHeight);
        const obj =document.getElementById("hotelImage");
        if(obj!=undefined){
        if(window.scrollY>=(obj?.clientHeight-64)){
          setnavbar("navBar");
        }
        else{
          setnavbar("navBarTransparent");
        }
      }
      }   
     window.addEventListener("scroll",changeOnScroll);
     return () =>{
        window.removeEventListener("scroll",changeOnScroll);
      }
    },[])*/

  //creating an observable to handle scroll event to make NavBar transitions

  const currentNavbar = useRef(navbar);
  currentNavbar.current = navbar;
  //creating an observable to handle scroll event to make NavBar transitions
  const scrollObserver$ = fromEvent(window, "scroll");
  scrollObserver$.subscribe(() => {
    console.log(window.scrollY + "height is" + window.innerHeight);
    const obj = document.getElementById("hotelImage");

    if (obj !== undefined && obj?.clientHeight !== undefined) {
      if (window.scrollY >= obj?.clientHeight - 64) {
        setnavbar("navBar");
      } else {
        setnavbar("navBarTransparent");
      }
    }
  });
  console.log(currentNavbar.current);
  useEffect(() => {
    async function api() {
      const response = await fetch("/hotel.json");

      const json = await response.json();

      dispatch(completed(json.map((x: IRestaurant) => x.restaurant)));
    }
    dispatch(started());
    api();
  }, [dispatch]);

  return (
    <div className={styles.bodyBackground}>
      <img
        src={svgImage}
        id="hotelImage"
        alt="hotel"
        className={
          isActive
            ? styles.navBarImage2AndBackground
            : styles.navBarImageAndBackground
        }
      />

      <div className={isActive2 ? styles.headerText2 : styles.headerText}>
        Welcome to my HotelBooking website
      </div>
      <AppBar position="fixed" className={styles[currentNavbar.current]}>
        <Container>
          <div className={styles.searchNav}>
            <div className={styles.searchInput}>
              <SearchIcon className={styles.searchiconp} />

              <InputBase
                className={styles.inputbase}
                fullWidth
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>

            <div className={styles.ButtonBar}>
              {context?.uid && (
                <Button
                  className={
                    currentNavbar.current === "navBarTransparent"
                      ? styles.appBarfont2
                      : styles.AppBarFont
                  }
                  onClick={() => history.push("/Profile")}
                >
                  Profile
                </Button>
              )}
              {!context?.uid && (
                <Button
                  className={
                    currentNavbar.current === "navBarTransparent"
                      ? styles.appBarfont2
                      : styles.AppBarFont
                  }
                  onClick={() => history.push("/Login")}
                >
                  Login
                </Button>
              )}
              {!context?.uid && (
                <Button
                  className={
                    currentNavbar.current === "navBarTransparent"
                      ? styles.appBarfont2
                      : styles.AppBarFont
                  }
                  onClick={() => history.push("/SignUp")}
                >
                  SignUp
                </Button>
              )}
            </div>
          </div>
        </Container>
      </AppBar>

      <div className={styles.fontTypo}>Restaurents</div>
      <Grid
        lg={12}
        item
        container
        spacing={2}
        className={styles.gridContainer}
        justifyContent="flex-start"
        alignItems="center"
      >
        {hotels
          .filter(
            (hotel) =>
              hotel.name
                .toString()
                .toLowerCase()
                .includes(searchInput.toString().toLowerCase()) ||
              hotel.cuisines
                .toString()
                .toLowerCase()
                .includes(searchInput.toString().toLowerCase())
          )
          .map((x) => (
            <Grid item lg={4} sm={6} xs={12}>
              <HotelCard {...x} />
            </Grid>
          ))}
      </Grid>
    </div>
  );
}

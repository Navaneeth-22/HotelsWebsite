import { Fab, makeStyles, Theme } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import firebase from "firebase";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { app } from "./firebaseSetup";
import profilePhoto from "./profile.png";
import { userContext } from "./UserProvider";

const useStyles = makeStyles<Theme, {}>({
  bodyBackground: {
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(-45deg, rgba(117,214,249,1), rgba(193,135,255,1) 70.71%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  childContainer: {
    width: "45%",
    height: "80%",
    backgroundColor: "rgba(0,0,0,0.15)",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  imageContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "55%",
    borderRadius: "5px",
    margin: "10px",
  },
  imageContainer2: {
    maxWidth: "55%",
    borderRadius: "5px",
  },
  gridContainer: {
    width: "100vw",

    padding: "70px 20px 20px 20px",
  },
  headerText: {
    margin: "10px",
    color: "black",
    fontFamily: "Lobster, cursive",
    fontSize: "1.5rem",
  },
});

export default function Profile() {
  const context = useContext(userContext);
  const styles = useStyles();
  const history = useHistory();
  const [allRandomImages, setAllRandomImages] = useState<any>([]);
  context?.reload();
  const [profile, setProfile] = useState<string>(
    context?.uid && context?.photoURL ? context?.photoURL : profilePhoto
  );

  const onChange = async (e: any) => {
    const file = e.target.files[0];
    const storage = app.storage();
    if (context && context.uid) {
      storage
        .ref()
        .child("user-profiles")
        .child(context?.uid)
        .child(file.name)
        .put(file)
        .then((response) => response.ref.getDownloadURL())
        .then((photoURL) => context.updateProfile({ photoURL }));
    }

    if (
      (context && context.uid != null && context?.photoURL != null) ||
      context?.photoURL !== undefined
    ) {
      if (context.photoURL != null) await setProfile(context.photoURL);
      console.log("photo was added");
    }
  };

  //listing all files present in firebase storage of current user who has signed in
  const listAllimages = () => {
    const storage = app.storage();
    if (context && context.uid) {
      const listRef = storage
        .ref()
        .child("user-profiles/")
        .child(context.uid + "/");
      console.log(listRef);
      listRef
        .listAll()
        .then((result) => {
          return Promise.all(
            result.items
              .filter((imageRef) =>
                imageRef.name
                  .toString()
                  .includes(
                    ".png" ||
                      ".jpeg" ||
                      ".jpg" ||
                      ".svg" ||
                      ".webp" ||
                      ".jfif" ||
                      ".pjpeg" ||
                      ".pjp"
                  )
              )
              .map((imageRef) => imageRef.getDownloadURL())
          );
        })
        .then((urlsArray) => setAllRandomImages(urlsArray))

        .catch((error) => {
          // Uh-oh, an error occurred!
          console.error(error.message);
        });
    }
  };

  //const b = useRef(1);

  useEffect(() => {
    listAllimages();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleOnError = () => {
    if (allRandomImages[0] != null) setProfile(allRandomImages[0]);
    else setProfile(profilePhoto);
  };

  return (
    <div className={styles.bodyBackground}>
      <div className={styles.childContainer}>
        <div className={styles.imageContainer}>
          <img
            id="profilePhoto"
            src={allRandomImages[0] != null ? allRandomImages[0] : profile}
            alt="profile"
            className={styles.imageContainer}
            onError={handleOnError}
          />

          <h2 className={styles.headerText}>
            hello {context?.displayName ? context?.displayName : "!!!"}
          </h2>

          <label htmlFor="upload-photo">
            <input
              style={{ display: "none" }}
              id="upload-photo"
              name="upload-photo"
              type="file"
              onChange={onChange}
            />
            <Fab
              color="secondary"
              size="small"
              component="span"
              aria-label="add"
              variant="extended"
            >
              <AddIcon /> Upload photo
            </Fab>
          </label>
          <Fab
            color="primary"
            size="small"
            component="span"
            aria-label="add"
            variant="extended"
            onClick={async () => {
              await firebase.auth().signOut();
              history.push("/");
            }}
          >
            SignOut
          </Fab>
        </div>
      </div>
      {/*<Grid
        lg={12}
        item
        container
        spacing={4}
        className={styles.gridContainer}
        justifyContent="flex-start"
        //  alignItems="center"
      >
        {allRandomImages.map((img: any) => (
          <Grid item lg={4} sm={6} xs={12}>
            <img src={img} />
          </Grid>
        ))}
        </Grid>*/}
    </div>
  );
}

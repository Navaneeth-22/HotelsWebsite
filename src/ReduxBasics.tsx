import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {IStatusizedUser,IUser} from "./UserReducer"
import { AppState } from "./AppState";
import { Grid } from "@material-ui/core";
export default function ReduxBasics(){
    const dispatch = useDispatch();
    const statusizedUser:IStatusizedUser = useSelector((state:AppState) => state.UserReducer)
    useEffect(() =>
    {
        async function api(){
            const response =await fetch("https://reqres.in/api/users");
            const json = await response.json();
            dispatch({type:"completed",payload:json.data})
        }
        dispatch({type:"started"})
        api();
    },[])
   
       
            if(statusizedUser.loading){
            return <div>Loading</div>
            }
            else
            {
                return <Grid container spacing={2}>{statusizedUser.users.map(renderUser)}</Grid>
                

                
            }
       
            
function renderUser(user:IUser):JSX.Element{
  return(
    <Grid item xs={4}>
    <div>
        <img src={user.avatar}/>
        <div>{user.first_name}</div>
    </div>
  </Grid>
  );
}

    }
    
    

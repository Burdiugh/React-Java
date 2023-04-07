import { Dispatch } from "react";
import { AuthUserActionType, IAuthResponse, IGoogleAuthUser, ILogin, IRegister, IUser, UserActions } from "./types";
import http_common from "../../http_common";
import { APP_ENV } from "../../env";
import jwtDecode from "jwt-decode";
import setAuthToken from "../../helpers/setAuthToken";
import http from "../../http_common";
import { store } from "../../store";
import { log } from "console";

export const LoginUser =(values: ILogin)=> async ( dispatch: Dispatch<any>) => {
    try {
    const resp = await http.post<IAuthResponse>(
        `${APP_ENV.REMOTE_HOST_NAME}api/account/login`,
        values
      );
      AuthUserToken(resp.data.token)(dispatch);
      return Promise.resolve();

    } catch (error: any) {
        return Promise.reject();
    }
}

export const AuthUserToken = (token: string)=>async (dispatch: Dispatch<UserActions>) => {
    const user = jwtDecode(token) as IUser;
    setAuthToken(token);
      dispatch({
        type: AuthUserActionType.AUTH_USER,
        payload: user 
      });
      
}

export const LoginFromLocalStorage = () => async (dispatch: Dispatch<UserActions>)=>{
    const { token } = localStorage;
  const user = jwtDecode(token) as IUser;
  http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  dispatch({
    type: AuthUserActionType.AUTH_USER,
    payload: user,
  });
}

export const RegistrationUser = (values: IRegister )=> async (dispatch:Dispatch<UserActions>)=>{

    http
    .post<IAuthResponse>(
      `${APP_ENV.REMOTE_HOST_NAME}api/account/register`,
      values
    )
    .then((data) => {
      var token = data.data.token;
      console.log("registration token",token);
      if (token) {
        AuthUserToken(token)(dispatch);
        const user = jwtDecode(token) as IUser;
         console.log("registration user", user);
        dispatch({
          type: AuthUserActionType.AUTH_USER,
          payload: user
        })
      }
     
    })
    .catch((errors) => {
      console.log("Register errors", errors);
    });
}

export const AuthGoogle =
  (values: IGoogleAuthUser) => async (dispatch: Dispatch<UserActions>) => {
    try {
      http
        .post<IAuthResponse>(`${APP_ENV.REMOTE_HOST_NAME}api/account/google-auth`, values)
        .then(({ data }) => {
          console.log(data);
          AuthUserToken(data.token)(dispatch);
          
          const user = jwtDecode(data.token) as IUser;
          dispatch({ type: AuthUserActionType.AUTH_USER, payload: user });
        });
    } catch (err) {}
  };
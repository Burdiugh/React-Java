export interface ILogin{
  email:string,
  password:string,
  reCaptchaToken:string
}

export interface IAuthResponse{
  token: string;
}

export interface IRegister{
  reCaptchaToken: any;
    firstName:string,
  lastName:string
  email:string,
  password:string,
  }

  export interface IUser{
    firstName:string,
    lastName: string,
    email: string,
    phone: string,
    image: string,
    roles: string[],
  }

  export interface IGoogleAuthUser {
    token: string;
  }

  export interface IAuthUser{
    isAuth: boolean,
    user?:IUser
  }

  export enum AuthUserActionType{
    AUTH_USER= "AUTH_LOGIN_USER",
    LOGOUT_USER ="AUTH_LOGOUT_USER",
  }

  export interface AuthUserAction {
    type: AuthUserActionType.AUTH_USER;
    payload: IUser;
  }
  

  export interface LogOutUserAction {
    type: AuthUserActionType.LOGOUT_USER;
  }



  export type UserActions = AuthUserAction | LogOutUserAction;
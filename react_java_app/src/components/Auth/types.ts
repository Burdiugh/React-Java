export interface ILogin{
  email:string,
  password:string,
  reCaptchaToken:string
}

export interface IAuthResponse{
  token: string;
}

export interface IRegister{
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

  export interface IAuthUser{
    isAuth: boolean,
    user?:IUser
  }

  export enum AuthUserActionType{
    LOGIN_USER= "AUTH_LOGIN_USER",
    LOGOUT_USER ="AUTH_LOGOUT_USER",
    REGISTER_USER ="AUTH_REGISTER_USER",
  }
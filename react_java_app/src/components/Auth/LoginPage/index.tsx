import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import LoginPage from "./LoginPage";

const Login = () => {
  return (
    <>
      <GoogleReCaptchaProvider reCaptchaKey="6Lfh_z8lAAAAAOWdrGBXNorKltFCEOYkwkkOHibM">
        <LoginPage />
      </GoogleReCaptchaProvider>
    </>
  );
};

export default Login;

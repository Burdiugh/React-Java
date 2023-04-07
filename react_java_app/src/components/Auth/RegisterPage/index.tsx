import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import RegisterPage from "./RegisterPage";

const Register = () => {
  return (
    <>
      <GoogleReCaptchaProvider reCaptchaKey="6Lfh_z8lAAAAAOWdrGBXNorKltFCEOYkwkkOHibM">
        <RegisterPage></RegisterPage>
      </GoogleReCaptchaProvider>
    </>
  );
};

export default Register;

import { useCallback, useEffect, useState } from "react";
import { loginFields } from "../../constants/formFields";
import Input from "../utilities/Input";
import { useDispatch } from "react-redux";
import { loginAction } from "../../redux/auth/auth.actions";
import { setAuthUser } from "../../redux/auth/auth.reducer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Login() {
  require("./../../components/login-page/login.scss");

  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [loginState, setLoginState] = useState(fieldsState);

  console.log({ loginState });

  const handleSuccessLogin = (data) => {
    dispatch(setAuthUser(data));

    navigation('/');
  }

  const handleErrorLogin = (errorResponse) => {
    if (errorResponse.status === 401) {
      toast('Invalid credentials')
    } else {
      toast('An error occurred')
    }
  }

  const handleLogin = useCallback(() => {
    dispatch(loginAction(loginState, handleSuccessLogin, handleErrorLogin));
  }, [dispatch, handleSuccessLogin, loginState])

  const handleChange = (e) => {
    setLoginState(prev => ({ ...loginState, [e.target.id]: e.target.value }));
  };

  useEffect(() => {
    const listener = (event) => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') handleLogin();
    };
    document.addEventListener('keydown', listener);

    return () => document.removeEventListener('keydown', listener);
  }, [handleLogin]);

  return (
    <form className="mt-8 space-y-6">
      <div className="-space-y-px">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={loginState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
      </div>
      <div className="login-button" onClick={handleLogin}>
        Logheaza-te
      </div>
    </form>
  );
}

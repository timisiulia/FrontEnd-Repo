import { useState } from "react";
import { signupFields } from "../../constants/formFields";
import FormAction from "../utilities/FormAction";
import Input from "../utilities/Input";
import { useDispatch } from "react-redux";
import { registerAction } from "../../redux/auth/auth.actions";
import { toast } from "react-toastify";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import Login from "../login-page/Login";

const fields = signupFields;
let fieldsState = {};

fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signupState, setSignupState] = useState(fieldsState);

  const handleChange = (e) =>
    setSignupState({ ...signupState, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (signupState.password !== signupState['confirm-password']) {
      toast("Parola nu coincide")
    }

    console.log(signupState);
    dispatch(
      registerAction(
        signupState,
        () => {
          toast("Register success");
          navigate("/login");
        },
        () => {
          toast("Error on register");
        }
      )
    );
  };

  //handle Signup API Integration here
  const createAccount = () => {};

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="flex align-center justify-center flex-col">
          <h2 className="flex align-center justify-center text-center text-3xl font-extrabold text-gray-900">
            Inregistreaza-te
          </h2>
          <p className="flex mt-2 justify-center text-center text-sm text-gray-600 mt-5">
            <Link
              to={"/login"}
              className="font-medium text-purple-600 hover:text-purple-500"
            >
              Ai deja cont?
            </Link>
          </p>
        </div>
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={signupState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
        <FormAction handleSubmit={handleSubmit} text="Inregistreaza-te" />
    </form>
  );
}

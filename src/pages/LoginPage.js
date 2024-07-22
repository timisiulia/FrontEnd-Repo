import Login from "../components/login-page/Login";
import {Link} from "react-router-dom";

export default function LoginPage() {
  return (
    <>
      <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
            <div className="flex align-center justify-center flex-col">
              <h2 className="flex align-center justify-center mt-6 text-center text-3xl font-extrabold text-gray-900">
                Intra in cont
              </h2>
              <p className="flex mt-2 justify-center text-center text-sm text-gray-600 mt-5">
                <Link
                  to={'/signup'}
                  className="font-medium text-purple-600 hover:text-purple-500"
                >
                  Inca nu ai cont?
                </Link>
              </p>
            </div>
          <Login />
        </div>
      </div>
    </>
  );
}

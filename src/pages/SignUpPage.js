import Signup from "../components/signup-page/Signup";

export default function SignupPage() {
  return (
    <>
      <div className="min-h-full h-screen flex justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <Signup />
        </div>
      </div>
    </>
  );
}

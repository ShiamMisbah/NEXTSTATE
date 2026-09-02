import { SignUp } from "@clerk/react";

const Signup = () => {
  return (
    <div className="flex min-h-screen items-center justify-center pt-32 pb-24">
      <SignUp
        routing="path"
        path="/signup"
        signInUrl="/login"
        fallbackRedirectUrl="/"
      />
    </div>
  );
};

export default Signup;

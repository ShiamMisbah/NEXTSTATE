import { SignIn } from "@clerk/react";

const Login = () => {
  return (
    <div className="flex min-h-screen items-center justify-center pt-32 pb-24">
      <SignIn
        routing="hash"
        signUpUrl="/signup"
        fallbackRedirectUrl="/"
      />
    </div>
  );
};

export default Login;

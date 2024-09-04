import { useState } from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center mb-4 text-3xl font-semibold">
        Login to get access!
      </h2>
      <form className="space-y-4">
        <Input type="email" name="email" placeholder="Email address" required />
        <Input type="email" name="email" placeholder="Password" required />

        <Button fullWidth isLoading={isLoading}>
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;

import { useState } from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import InputErrorMessage from "../components/ui/InputErrorMessage";
import { REGISTER_FORM } from "../data";
import Navbar from "./../components/Navbar";

interface IFormInput {
  username: string;
  email: string;
  password: string;
}

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  // ** Handlers
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  // ** Renders
  const renderRegisterForm = REGISTER_FORM.map((input, idx) => (
    <div key={idx}>
      <Input
        type={input.type}
        placeholder={input.placeholder}
        {...register(`${input.name}`, input.validation)}
      />
      {errors[input.name] && (
        <InputErrorMessage msg={errors[input.name]?.message} />
      )}
    </div>
  ));

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center mb-4 text-3xl font-semibold">
        Register to get access!
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {renderRegisterForm}
        <Button fullWidth isLoading={isLoading}>
          {isLoading ? "Loading... " : "Register"}
        </Button>
      </form>
    </div>
  );
};

export default Register;

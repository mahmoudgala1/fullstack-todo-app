import { IRegisterInput } from "../interfaces";

export const REGISTER_FORM: IRegisterInput[] = [
  {
    name: "username",
    type: "text",
    placeholder: "Username",
    validation: { required: true, minLength: 5 },
  },
  {
    name: "email",
    type: "text",
    placeholder: "Email",
    validation: { required: true, pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}/ },
  },
  {
    name: "password",
    type: "password",
    placeholder: "Password",
    validation: { required: true, minLength: 6 },
  },
];

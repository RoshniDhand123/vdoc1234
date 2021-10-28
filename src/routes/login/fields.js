import Field from "../../components/Field";

export default [
  {
      name: "contact",
    component: Field,
    placeholder: "Email",
    type: "text",
    icon: "",
    required: true,
  },
  {
    name: "password",
    component: Field,
    placeholder: "Password",
    type: "password",
    required: true,
    displayable: true,
  },
];

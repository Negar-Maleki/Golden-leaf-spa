import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useForm } from "react-hook-form";
import { useSignup } from "./useSignup";
import Spinner from "../../ui/Spinner";
import { useState } from "react";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { signup, isLoading } = useSignup();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();
  const [value, setValue] = useState("admin");

  function onSubmit({ name, email, password }) {
    signup(
      { name, email, password, role: value },
      {
        onSettled: () => {
          reset();
        },
      }
    );
  }

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "Full name is required" })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow label="Email address" error={errors.email?.message}>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid email address",
            },
          })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors.password?.message}
      >
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "Please confirm your password",
            validate: (value) =>
              value === watch("password") || "Passwords do not match",
          })}
          disabled={isLoading}
        />
      </FormRow>
      <FormRow label="Role" error={errors.role?.message}>
        <select
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={isLoading}
        >
          <option value="admin">Admin</option>
          <option value="user">User</option>
          <option value="manager">Manager</option>
        </select>
      </FormRow>
      <FormRow label="Avatar URL" error={errors.avatar?.message}>
        <Input
          type="text"
          id="avatar"
          {...register("avatar")}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disabled={isLoading}>
          Cancel
        </Button>
        <Button disabled={isLoading}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;

/*
abi
abi@gmail.com 
12345678

*/

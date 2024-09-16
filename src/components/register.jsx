import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import { useMutation } from "react-query";
import { registerUser } from "../api/userAuthorisatie";
import PropTypes from "prop-types";
import "../css/register.css";
import Loader from "./Loader";

function Register({ isOpen, onClose, onRegister }) {
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
    watch,
  } = useForm();

  const registrationMutation = useMutation(registerUser, {
    onError: (error) => {
      console.error("Error during registration:", error);
      if (error.response && error.response.status === 400) {
        if (error.response.data.includes("The given email already exists")) {
          setError("email", {
            type: "manual",
            message: "The email already exists",
          });
        }
      }
    },
  });

  const password = watch("password");
  const confirmPass = watch("confirmPassword");

  const isOver16 = (date) => {
    const dob = new Date(date);
    const today = new Date();
    dob.setFullYear(dob.getFullYear() + 16);

    return dob < today || "Je moet minstens 16 jaar zijn";
  };

  const onSubmit = (data) => {
    if (!password || password !== confirmPass) {
      return;
    }

    const { confirmPassword, ...formData } = data; // confirmpass uit data halen zodat niet meegaat naar api call.

    registrationMutation.mutate(formData);
  };

  useEffect(() => {
    if (registrationMutation.isSuccess) {
      onRegister();
    }
  }, [onRegister, registrationMutation]);
  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose} data-cy="close-button">
          &times;
        </span>
        <h2>Registratie</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <Controller
              name="username"
              control={control}
              rules={{
                required: "Username is verplicht",
                maxLength: {
                  value: 30,
                  message: "Username mag maximum uit 30 karakters bestaan",
                },
              }}
              render={({ field }) => (
                <input
                  type="text"
                  {...field}
                  id="username"
                  name="username"
                  autoComplete="username"
                  value={field.value || ""}
                  data-cy="username-input"
                />
              )}
            />
            {errors.username && (
              <p className="form-text text-danger" data-cy="username-error">
                {errors.username.message}
              </p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is verplicht",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              }}
              render={({ field }) => (
                <input
                  type="email"
                  {...field}
                  id="email"
                  name="email"
                  value={field.value || ""}
                  data-cy="email-input"
                />
              )}
            />
            {errors.email && (
              <p className="form-text text-danger" data-cy="email-error">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is verplicht",
                minLength: {
                  value: 6,
                  message: "Password moet minstens 6 karakters bevatten",
                },
                maxLength: {
                  value: 30,
                  message: "Password mag maximum uit 30 karakters bestaan",
                },
              }}
              render={({ field }) => (
                <input
                  type="password"
                  {...field}
                  id="password"
                  name="password"
                  value={field.value || ""}
                  data-cy="password-input"
                />
              )}
            />
            {errors.password && (
              <p className="form-text text-danger" data-cy="password-error">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                validate: (value) =>
                  value === password || "Passwords komen niet overreen",
              }}
              render={({ field }) => (
                <input
                  type="password"
                  {...field}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={field.value || ""}
                  data-cy="confirmPassword-input"
                />
              )}
            />
            {errors.confirmPassword && (
              <p
                className="form-text text-danger"
                data-cy="confirmPassword-error"
              >
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="naam">Naam:</label>
            <Controller
              name="name"
              control={control}
              rules={{
                required: "Naam is verplicht",
                maxLength: {
                  value: 50,
                  message: "naam mag maximum uit 50 karakters bestaan",
                },
              }}
              render={({ field }) => (
                <input
                  type="text"
                  {...field}
                  id="name"
                  name="name"
                  value={field.value || ""}
                  data-cy="name-input"
                />
              )}
            />
            {errors.name && (
              <p className="form-text text-danger" data-cy="naam-error">
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="familynaam">Familienaam:</label>
            <Controller
              name="lastName"
              control={control}
              rules={{
                required: "Familienaam is verplicht",
                maxLength: {
                  value: 50,
                  message: "familienaam mag maximum uit 50 karakters bestaan",
                },
              }}
              render={({ field }) => (
                <input
                  type="text"
                  {...field}
                  id="lastName"
                  name="lastName"
                  value={field.value || ""}
                  data-cy="familynaam-input"
                />
              )}
            />
            {errors.lastName && (
              <p className="form-text text-danger" data-cy="familienaam-error">
                {errors.lastName.message}
              </p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="geboortedatum">Geboortedatum:</label>
            <Controller
              name="dateOfBirth"
              control={control}
              rules={{
                required: "Geboortedatum is verplicht",
                validate: isOver16,
              }}
              render={({ field }) => (
                <input
                  type="date"
                  {...field}
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={field.value || ""}
                  data-cy="geboortedatum-input"
                />
              )}
            />
            {errors.dateOfBirth && (
              <p
                className="form-text text-danger"
                data-cy="geboortedatum-error"
              >
                {errors.dateOfBirth.message}
              </p>
            )}
          </div>
          {registrationMutation.isLoading && (
            <Loader data-cy="register-loader" />
          )}

          {registrationMutation.isError && (
            <div className="error-message" data-cy="error-message">
              Registration failed: {registrationMutation.error.message}
            </div>
          )}
          <button type="submit" data-cy="register-button">
            Registreer
          </button>
        </form>
      </div>
    </div>
  );
}

Register.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
};

export default Register;

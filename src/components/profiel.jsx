import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { updateUser, useUserInfo, useDeleteUser } from "../api/userInformation";
import "../css/profiel.css";
import Loader from "./Loader";
import { useQueryClient, useMutation } from "react-query";
import { useToken } from "./context/tokenHooks";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router";

const formatDate = (date) => {
  if (!date) return "";

  const d = new Date(date);
  const day = d.getDate().toString().padStart(2, "0");
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const year = d.getFullYear();

  return `${day}-${month}-${year}`;
};

const attributeMapping = {
  name: "name",
  lastName: "lastName",
  username: "username",
  email: "email",
  password: "password",
};

const ProfilePage = () => {
  const { token, setAuthToken } = useToken();
  const navigate = useNavigate();
  const { userInfo } = useUserInfo(token);
  const {
    handleSubmit,
    control,
    clearErrors,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      name: userInfo?.name || "",
      lastName: userInfo?.last_name || "",
      username: userInfo?.username || "",
      email: userInfo?.email || "",
      password: "",
    },
  });
  const [editMode, setEditMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const queryClient = useQueryClient();
  const { deleteUserHandler, isLoading: isDeleteLoading } = useDeleteUser();

  const mutation = useMutation(updateUser(token), {
    onError: (error) => {
      console.log(error.message);
      if (error) {
        console.error("Error during updating:", error);
        if (error.message.includes("The givin email already exists")) {
          setErrorMessage("Er bestaat al een account met deze email.");
        } else {
          setErrorMessage("An unexpected error occurred during the update.");
        }
      } else {
        if (!error) {
          console.error("Network error during updating:", error);
          setErrorMessage("Network error: Unable to connect to the server");
        }
      }
    },
  });

  const handleEditClick = () => {
    setValue("name", "");
    setValue("lastName", "");
    setValue("username", "");
    setValue("email", "");
    setErrorMessage("");
    setValue("password", "");

    setEditMode(true);
  };

  const handleDeleteClick = () => {
    const confirmDelete = window.confirm(
      "Ben je zeker dat je jou profiel wilt verwijderen?"
    );

    if (confirmDelete) {
      try {
        deleteUserHandler(token);
        toast.success("Profiel succesvol verwijderd!", {
          autoClose: false,
          draggable: false,
          closeButton: (
            <button
              onClick={() => {
                toast.dismiss();
                setAuthToken("null");
                navigate("/");
              }}
            >
              Continue
            </button>
          ),
          className: "custom-toast-delete",
        });
        console.log("Profiel verwijderd!");
      } catch (error) {
        console.error("Error deleting profile:", error);
        toast.error("Verwijderen niet gelukt. Probeer eens opnieuw.", {
          autoClose: 5000,
        });
      }
    }
  };

  const handleReturnClick = () => {
    clearErrors();
    setEditMode(false);
  };

  const onSubmit = (data) => {
    const updatedData = {};

    for (const key in data) {
      if (data[key] !== userInfo[key] && data[key] !== "") {
        const apiValue = attributeMapping[key];
        updatedData[apiValue] = data[key];
      }
    }

    if (Object.keys(updatedData).length > 0 && mutation) {
      mutation.mutate(updatedData);
    } else {
      setEditMode(false);
    }
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      setEditMode(false);
      queryClient.setQueryData("userInfo", mutation.data);
      queryClient.invalidateQueries("userInfo");
      console.log("Update successful");
    }
  }, [mutation.isSuccess, mutation.data, queryClient]);

  return (
    <div className="profile-container">
      <h1>Profiel</h1>
      {editMode ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Naam: {userInfo.name}</label>
            <Controller
              name="name"
              control={control}
              rules={{
                maxLength: {
                  value: 50,
                  message: "Naam mag maximum 50 karakters lang zijn",
                },
              }}
              render={({ field }) => (
                <input
                  type="text"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    setErrorMessage("");
                  }}
                />
              )}
            />
            {errors.name && (
              <p className="form-text text-danger">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label>Achternaam: {userInfo.last_name}</label>
            <Controller
              name="lastName"
              control={control}
              rules={{
                maxLength: {
                  value: 50,
                  message: "familienaam mag maximum uit 50 karakters bestaan",
                },
              }}
              render={({ field }) => (
                <input
                  type="text"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                />
              )}
            />
            {errors.lastName && (
              <p className="form-text text-danger" data-cy="familienaam-error">
                {errors.lastName.message}
              </p>
            )}
          </div>
          <div>
            <label>Gebruikersnaam: {userInfo.username}</label>
            <Controller
              name="username"
              control={control}
              rules={{
                maxLength: {
                  value: 30,
                  message: "gebruikersnaam mag maximum 30 karakters lang zijn",
                },
              }}
              render={({ field }) => (
                <input
                  type="text"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                />
              )}
            />
            {errors.username && (
              <p className="form-text text-danger">{errors.username.message}</p>
            )}
          </div>
          <div>
            <label>Email: {userInfo.email}</label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <input
                  type="text"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  autoComplete="username"
                />
              )}
              rules={{
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              }}
            />
            {(errors.email || errorMessage) && (
              <div className="error-message">
                {errors.email && errors.email.message}
                {errorMessage && errorMessage}
              </div>
            )}
          </div>
          <div>
            <label>Nieuw wachtwoord:</label>
            <Controller
              name="password"
              control={control}
              rules={{
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
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  autoComplete="current-password"
                />
              )}
            />
            {errors.password && (
              <p className="form-text text-danger">{errors.password.message}</p>
            )}
          </div>
          <button type="submit">Opslaan</button>
          <button type="button" onClick={handleReturnClick}>
            annuleer
          </button>
          {mutation.isLoading && <Loader />}
          {mutation.isError && (
            <div className="error-message" data-cy="error-message">
              Registration failed: {mutation.error.message}
            </div>
          )}
        </form>
      ) : (
        <div>
          {userInfo ? (
            <div>
              <p>Naam: {userInfo.name}</p>
              <p>Achternaam: {userInfo.last_name}</p>
              <p>Geboortedatum: {formatDate(userInfo.date_of_birth)}</p>
              <p>Gebruikersnaam: {userInfo.username}</p>
              <p>Email: {userInfo.email}</p>
              <button onClick={handleEditClick}>Bewerken</button>
              <button
                type="button"
                onClick={handleDeleteClick}
                disabled={isDeleteLoading}
              >
                Verwijder profiel
              </button>
              <ToastContainer />
            </div>
          ) : (
            <Loader />
          )}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;

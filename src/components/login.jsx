import { useState } from 'react';
import { userLogin } from '../api/userAuthorisatie';
import '../css/login.css';
import { useNavigate, useLocation } from 'react-router';
import { useForm, Controller } from 'react-hook-form';
import { useToken } from '../components/context/tokenHooks';
import {useMutation} from 'react-query';
import { useMemo } from 'react';
import Loader from './Loader';



function Login() {
  const { handleSubmit, control, formState: { errors } } = useForm();
  const [errorResponse, setErrorResponse] = useState('');
  const navigate = useNavigate();
  const { setAuthToken } = useToken();
  const { search } = useLocation();


  const redirect = useMemo(() => {
    const urlParams = new URLSearchParams(search);
    if (urlParams.has("redirect"))
      return urlParams.get("redirect");
    return "/";
  }, [search]);

  const loginMutation = useMutation(userLogin(setAuthToken), { 
    onError: (error) => {
      console.error('Error during login:', error);
      if (error.response && error.response.status === 400) {
        setErrorResponse('Invalid credentials. Please try again.');
      }
    },
    onSuccess: () => {
      console.log('Login successful');
      navigate(redirect);
    },
  });

  const onSubmit = async (data) => {
    setErrorResponse('');
    loginMutation.mutate(data);
  };

  return (
    <div className="login-page">
      <div className="login-form">
        <h2>Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              {errorResponse && <p className="error">{errorResponse.message}</p>}
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: 'Email is verplicht',
                    pattern: {
                      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: 'Ongeldige e-mail',
                    },
                  }}
                  render={({ field }) => (
                    <input type="email" id="email" data-cy="email-input" {...field} value={field.value || ''} />
                  )}
                />
                {errors.email && <p className="error" data-cy="email-error">{errors.email.message}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: 'Wachtwoord is verplicht',
                    minLength: {
                      value: 6,
                      message: 'Wachtwoord moet minstens 6 karakters lang zijn',
                    },
                  }}
                  render={({ field }) => (
                    <input type="password" id="password" data-cy="password-input" {...field} value={field.value || ''}/>
                  )}
                />
                {errors.password && <p className="error" data-cy="password-error">{errors.password.message}</p>}
              </div>
              <button type="submit" data-cy="login-button">Log In</button>
            </form>
            {loginMutation.isLoading && <Loader data-cy="login-loader"/>}
            {loginMutation.isError && <p className="error" data-cy="login-error">Invalid credentials. Please try again.</p>}
      </div>
    </div>
  );
}

export default Login;

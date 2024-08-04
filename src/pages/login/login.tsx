import { FC, SyntheticEvent, useState, useEffect } from 'react';
import { LoginUI } from '@ui-pages';
import { loginUser } from '../../services/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const error = useSelector((state) => state.user.errorMessage);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <LoginUI
      errorText={error?.toString()}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};

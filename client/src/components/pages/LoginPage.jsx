import styles from './LoginPage.module.css';
import UserApi from '../../entities/user/UserApi';
import UserValidate from '../../entities/user/UserValidate';
import { useNavigate } from 'react-router';
import { setAccessToken } from '../../shared/lib/axiosInstance';

export default function LoginPage({ setUser }) {
  const navigate = useNavigate();
  const loginHandler = async (e) => {
    try {
      e.preventDefault();
      const formData = Object.fromEntries(new FormData(e.target));
      const { isValid, error } = UserValidate.validateLoginData(formData);
      if (!isValid) return alert(error);
      const res = await UserApi.login(formData);
      setUser({ status: 'logged', data: res.data.user });
      setAccessToken(res.data.accessToken);
      navigate('/');
    } catch (error) {
      console.log(error);
      alert(error.response.data?.message);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={loginHandler}>
        <div className={styles.inputGroup}>
          <div className={styles.inputLabel}>Email</div>
          <input className={styles.input} name="email" type="email" required />
        </div>
        <div className={styles.inputGroup}>
          <div className={styles.inputLabel}>Password</div>
          <input className={styles.input} name="password" type="password" required />
        </div>
        <button type="submit" className={styles.submitButton}>
          Подтвердить
        </button>
      </form>
    </div>
  );
}
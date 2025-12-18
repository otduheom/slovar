import { NavLink, useNavigate } from 'react-router';
import UserApi from '../../entities/user/UserApi';
import Profile from '../pages/Profile';

function Header({ user, setUser }) {
  const navigate = useNavigate();
  const logoutHandler = async (e) => {
    try {
      const res = await UserApi.logout();
      setUser(null);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header role="banner" className="mar-t-5 pad-t-2 pad-b-4 pad-s-1 wrap-float bg-white">
      <div className="max-w-900 center wrap-float">
        <nav className="clearfix mar-b-1">
          <ul className="no-bullets no-margin no-padding left">
            <li className="pipe-separate t-light-green left">
              <NavLink to="/">Домой</NavLink>
            </li>
            {user?.status === 'logged' ? (
              <>
                <li className="pipe-separate t-light-green left">{user?.data.name}</li>

                <li className="pipe-separate t-light-green left">
                  <NavLink to="/profile">Личный кабинет</NavLink>
                </li>
                <li className="pipe-separate t-light-green left">
                  <NavLink to="/" onClick={logoutHandler}>
                    Выйти
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="pipe-separate t-light-green left">
                  <NavLink to="/signup">Регистрация</NavLink>
                </li>
                <li className="pipe-separate t-light-green left">
                  <NavLink to="/login">Вход</NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>

        <div style={{ textAlign: 'center', marginTop: '20px', color: '#32bb7d' }}>
          <h1>Словарь поколений</h1>
        </div>
      </div>
    </header>
  );
}

export default Header;

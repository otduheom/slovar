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
    <header role="banner" className="modern-header" style={{ position: 'sticky', top: 0, zIndex: 40, padding: '1rem' }}>
      <div className="max-w-900 center wrap-float">
        <nav className="clearfix mar-b-1" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="gradient-title" style={{ fontSize: '1.5rem', fontWeight: 700 }}>
            Словарь поколений
          </div>
          <ul className="no-bullets no-margin no-padding" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <li>
              <NavLink to="/" style={{ color: '#667eea', textDecoration: 'none', fontWeight: 500 }}>Главная</NavLink>
            </li>
            {user?.status === 'logged' ? (
              <>
                <li style={{ color: '#4a5568', fontWeight: 500 }}>{user?.data.name}</li>
                <li>
                  <NavLink to="/profile" style={{ color: '#667eea', textDecoration: 'none', fontWeight: 500 }}>Личный кабинет</NavLink>
                </li>
                <li>
                  <NavLink
                    to="/"
                    onClick={logoutHandler}
                    style={{ color: '#667eea', textDecoration: 'none', fontWeight: 500 }}
                  >
                    Выйти
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/signup" style={{ color: '#667eea', textDecoration: 'none', fontWeight: 500 }}>Регистрация</NavLink>
                </li>
                <li>
                  <NavLink to="/login" style={{ color: '#667eea', textDecoration: 'none', fontWeight: 500 }}>Вход</NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;

import { NavLink, useNavigate } from 'react-router';
import UserApi from '../../entities/user/UserApi';
import { useTheme } from '../../contexts/ThemeContext';
import { setAccessToken } from '../../shared/lib/axiosInstance';

function Header({ user, setUser }) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const logoutHandler = async (e) => {
    try {
      const res = await UserApi.logout();
      setUser({status: 'guest', data: null});
      setAccessToken('');
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header
      role="banner"
      className="modern-header"
      style={{ position: 'sticky', top: 0, zIndex: 40, padding: '1rem' }}
    >
      <div className="max-w-900 center wrap-float">
        <nav
          className="clearfix mar-b-1"
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <div className="gradient-title" style={{ fontSize: '1.5rem', fontWeight: 700 }}>
            Словарь поколений
          </div>
          <ul
            className="no-bullets no-margin no-padding"
            style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}
          >
            <li>
              <button
                type="button"
                onClick={toggleTheme}
                className="theme-toggle-button"
                title={
                  theme === 'light' ? 'Переключить на темную тему' : 'Переключить на светлую тему'
                }
              >
                {theme === 'light' ? '🌙' : '☀️'}
              </button>
            </li>
            <li>
              <NavLink to="/" style={{ color: '#667eea', textDecoration: 'none', fontWeight: 500 }}>
                Главная
              </NavLink>
            </li>
            {user?.status === 'logged' ? (
              <>
                <li style={{ color: '#4a5568', fontWeight: 500 }}>{user?.data.name}</li>
                {user?.data?.isAdmin && (
                  <li>
                    <NavLink
                      to="/moderation"
                      style={{ color: '#667eea', textDecoration: 'none', fontWeight: 500 }}
                    >
                      Модерация
                    </NavLink>
                  </li>
                )}
                <li>
                  <NavLink
                    to="/profile"
                    style={{ color: '#667eea', textDecoration: 'none', fontWeight: 500 }}
                  >
                    Личный кабинет
                  </NavLink>
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
                  <NavLink
                    to="/signup"
                    style={{ color: '#667eea', textDecoration: 'none', fontWeight: 500 }}
                  >
                    Регистрация
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/login"
                    style={{ color: '#667eea', textDecoration: 'none', fontWeight: 500 }}
                  >
                    Вход
                  </NavLink>
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

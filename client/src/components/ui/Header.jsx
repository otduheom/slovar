import { NavLink } from 'react-router';
import UserApi from '../../entities/user/UserApi';
import Profile from '../pages/Profile';

function Header({ user, setUser }) {
  const logoutHandler = async (e) => {
    try {
      const res = await UserApi.logout();
      setUser(null);
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
              <NavLink to="/">home</NavLink>
            </li>
            {user?.status === 'logged' ? (
              <>
                <li className="pipe-separate t-light-green left">{user?.data.name}</li>

                <li className="pipe-separate t-light-green left">
                  <NavLink to="/profile">Личный кабинет</NavLink>
                </li>
                <li className="pipe-separate t-light-green left">
                  <NavLink onClick={logoutHandler}>signout</NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="pipe-separate t-light-green left">
                  <NavLink to="/signup">signup</NavLink>
                </li>
                <li className="pipe-separate t-light-green left">
                  <NavLink to="/login">login</NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>

        <div className="logo-container">
          <img src="/images/logo.png" alt="brokk" className="center block logo" />
          <h1>Alex Blog</h1>
        </div>
      </div>
    </header>
  );
}

export default Header;

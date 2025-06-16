import { Link } from 'react-router-dom';
import jungra from '../assets/jungra.jpeg';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuth';
const Navbar = () => {
  const {logout}=useLogout()
  const {user}=useAuthContext()
  const handleClick=()=>{
  logout()
  }
  return (
    <header>
      <div className="container">
        <Link to="/" className="logo-link">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src={jungra} alt="Gym Buddy Logo" style={{ height: '60px' }} />
            <h1>Gym Buddy</h1>
          </div>
        </Link>
        <nav>
          {user && (
          <div>
             <span className="email-text">
            {user.email}
          </span>
            <button onClick={handleClick}>Log out</button>
          </div>
            )}
            {!user && (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
            )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

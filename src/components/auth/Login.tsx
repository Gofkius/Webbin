import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from '../App';

export let exportedUser: any = null;

type Props = {}

const Login = (props: Props) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState(null);

const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault(); // <- stop normal form submit
  setError(null);

  if (!username || !password) {
    setError('Email and password are required');
    return;
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: username,
      password: password,
    });

    console.log('signIn response', { data, error });
    if (error) {
      setError(error.message);
    } else {
      setUser((data as any).user);
      exportedUser = (data as any).user;
      navigate('/');
    }
  } catch (err) {
    console.error('signInWithPassword failed', err);
    setError('Unexpected error — check console');
  }
};

  return (
    <div className='login-container'>
        <h1>Welcome Back 👋</h1>
        <div className="error-message">{error}</div>
        <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input title="Use the email you signed up with" type="text" id="username" name="username" placeholder="Email" value={username} onChange={(e) => setUsername(e.target.value)} />
              <input title="Use the password you signed up with" type="password" id="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className='submit-button'>
              <button title="Click to sign in" type="submit">Login</button>
            </div>
            <div className='forgot-password'>
              <Link title="Click to reset your password" to="/forgot-password">Forgot Password?</Link>
            </div>
            <div className='break-line'/>
            <div className='social-login'>
              <button title="Sign in with Google (currently disabled)" disabled={true} className='google-login'>Google</button>
              <button title="Sign in with GitHub (currently disabled)" disabled={true} className='github-login'>GitHub</button>
            </div>
            <div className='break-line'/>
            <div className='register-account'>
              <p>Don't have an account? </p>
              <Link title="Click to register a new account" to="/register">Register</Link>
            </div>
        </form>
    </div>
  )
}

export default Login
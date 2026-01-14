import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from '../App';

export let exportedUser: any = null;

type Props = {}

const Register = (props: Props) => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState(null);

const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault(); // <- stop normal form submit
  setError(null);

  if (!username || !email || !password || !confirmPassword) {
    setError('Some information still needs to be filled out');
    return;
  }

  if (password !== confirmPassword) {
    setError('Passwords do not match');
    return;
  }

  try {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                username: username,
                first_name: firstName,
                last_name: lastName
            }
        }
    });

    console.log('Register response', { data, error });
    if (error) {
      setError(error.message);
    } else {
      setUser((data as any).user);
      exportedUser = (data as any).user;
      navigate('/login');
    }
  } catch (err) {
    console.error('signInWithPassword failed', err);
    setError('Unexpected error — check console');
  }
};

  return (
    <div className='register-container'>
        <div className='register-header'>
            <h1>Hey! Let's get to know each other!</h1>
        </div>
        <div className="error-message">{error}</div>
        <form onSubmit={handleSubmit}>
            <div className="input-group">
                <div className="input-name">
                    <input title="Enter your first name" type="text" id="firstname" name="firstname" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    <input title="Enter your last name" type="text" id="lastname" name="lastname" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <input title="Choose a username" type="text" id="username" name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input title="Use the email you want to register with" type="email" id="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                {password.length < 8 && <label htmlFor="password" style={{color: "red"}}>Must be 8 characters long</label>}
                <input aria-label="password" title="Create a strong password (minimum 8 characters)" style={password.length < 8 ? { outline: '2px solid #ff4b4b' } : undefined} type="password" id="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                {password !== confirmPassword && <label htmlFor="confirm" style={{color: "red"}}>Password must match</label>}
                <input name="confirm" title="Confirm your password" type="password" id="confirm" style={password !== confirmPassword ? { outline: '2px solid #ff4b4b' } : undefined} placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <div className='submit-button'>
              <button title="Click to register a new account" type="submit">Register</button>
            </div>
            <div className='break-line'/>
            <div className='social-login'>
              <button title="Sign in with Google (currently disabled)" disabled={true} className='google-login'>Google</button>
              <button title="Sign in with GitHub (currently disabled)" disabled={true} className='github-login'>GitHub</button>
            </div>
            <div className='break-line'/>
            <div className='register-account'>
              <p>Already signed up? </p>
              <Link title="Click to sign in to your account" to="/login">Login</Link>
            </div>
        </form>
    </div>
  )
}

export default Register
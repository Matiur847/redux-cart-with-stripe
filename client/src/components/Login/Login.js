import React, { useState } from 'react';
import './Login.css'
import { signInWithEmailAndPassword } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../Loader/Loader';

const Login = () => {

    // const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();

    const auth = getAuth();
    const handleSignIn = async () => {

        setLoading(true)

        if (!email && !password) {
            setError("Fill the form")
        }
        else if (!email) {
            setError("Enter your name")
        }
        else if (!password) {
            setError("Enter your password")
        }
        else if (password.length < 8) {
            setError("Password must be needed to 8 character!")
        }

        try {
            const user = await signInWithEmailAndPassword(auth, email, password);
            navigate('/products')
            toast.success('Login Successfull', {
                position: toast.POSITION.BOTTOM_LEFT,
                autoClose: 2000
            })
            localStorage.setItem('user', JSON.stringify(user))
            setLoading(false)

        } catch (error) {
            console.log(error.code)
            if (error.code === 'auth/invalid-credential') {
                setError("Enter valid details")
            }
            else if (error.code === 'auth/network-request-failed') {
                setError('Check your network connection')
            }
            setLoading(false)
        }
    }
    
    return (
        <div className="login-form-container">
            <h2>Login</h2>
            <form>
                <input
                className='mt-2'
                    type="text"
                    id="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Enter your Email'
                />
                <input
                className='mt-3'
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Enter your Password'
                />
                <p className='mt-2'>{error}</p>

                <button type="button" onClick={handleSignIn} disabled={!email || !password} >
                    Login {" "} {loading && <Loader />}
                </button>
                <div className="login-footer mt-2 d-flex align-items-center justify-content-center">
                    <p>Not have Account? {" "}
                        <span>
                            <Link to='/registration'>
                                {" "}
                                Sign Up
                            </Link>
                        </span>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;
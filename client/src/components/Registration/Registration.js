import React, { useState } from 'react';
import './Registration.css'
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { toast } from 'react-toastify';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import { fireDB } from '../../firebaseConfig';
import Loader from '../Loader/Loader';

const Registration = () => {

    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)


    // handle Sign up
    const auth = getAuth();
    const handleSignUp = async () => {
        setLoading(true)

        if (!email && !password && !name) {
            setError("Fill the form")
        }
        else if (!name) {
            setError("Enter your name")
        }
        else if (!email) {
            setError("Enter your email")
        }
        else if (!password) {
            setError("Enter your password")
        }
        else if (password.length < 8) {
            setError("Password needed to 8 character!")
        }

        try {
            const users = await createUserWithEmailAndPassword(auth, email, password);
            navigate('/login')

            const user = {
                name: name,
                uid: users.user.uid,
                email: users.user.email,
                time: Timestamp.now()
            }
            const userRef = collection(fireDB, "users")
            await addDoc(userRef, user);
            toast.success("Signup Succesfully", {
                position: toast.POSITION.BOTTOM_LEFT,
                autoClose: 2000
            })
            setName("");
            setEmail("");
            setPassword("");
            setLoading(false)

        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                setError("Email already in use")
            }
            else if (error.code === 'auth/network-request-failed') {
                setError('Check your network connection')
            }
            setLoading(false)
        }

        
    }

    return (
        <div className="login-form-container">
            <h2>Registration</h2>
            <form>
                <input
                    className='mt-3'
                    type="name"
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Enter First Name *'
                    required
                />
                <input
                    className='mt-3'
                    type="text"
                    id="username"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Enter your Email *'
                />
                <input
                    className='mt-3'
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Enter your Password *'
                />
                <p className='mt-2'>{error}</p>
                <button className='mt-3' type="button" onClick={handleSignUp} disabled={!name || !email || !password}>
                    Registration {" "} {loading && <Loader />}
                </button>
                <div className="login-footer mt-3 d-flex align-items-center justify-content-center">
                    <span>
                        <Link to='/login'>
                            Back to Login Page
                        </Link>
                    </span>
                </div>
            </form>
        </div>
    );
};

export default Registration;
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../Firebase/firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {

    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const emailRef = useRef(null);

    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        // reset success & error 
        setSuccess('');
        setRegisterError('');

        // add validation
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                if (result.user.emailVerified) {
                    console.log('Logged in successfully')
                }
                else {
                    alert('Please verify your email address')
                }
            })
            .catch(error => {
                console.error(error);
                setRegisterError(error.massage);
            })
    }

    const handleForgetPassword = () => {
        const email = emailRef.current.value;
        if (!email) {
            console.log('Please Provide an Email', emailRef.current.value);
            return;
        }
        else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            console.log('Please Write a valid email');
            return;
        }

        // send validation
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('Please check your email')
            })
            .catch(error => {
                console.log(error);
            })

    }

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    {/* form */}
                    <form
                        onSubmit={handleLogin}
                        className="card-body">
                        {/* email */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                ref={emailRef}
                                type="email"
                                placeholder="email"
                                name="email"
                                className="input input-bordered"
                                required />
                        </div>
                        {/* password */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="password"
                                name="password"
                                className="input input-bordered"
                                required />
                            <label className="label">
                                <a
                                    onClick={handleForgetPassword}
                                    href="#"
                                    className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        {/* button */}
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                        <div>
                            {
                                registerError && <p className="text-red-700">{registerError}</p>
                            }
                            {
                                success && <p className="text-blue-700">{success}</p>
                            }
                            <p>
                                New to this Website? Please <Link to='/register'>Register</Link>
                            </p>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default Login;
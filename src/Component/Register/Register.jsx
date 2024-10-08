import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../Firebase/firebase.config";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = () => {

    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const termsAccept = e.target.terms.checked;
        console.log(email, password, termsAccept, name);

        // reset success 
        setSuccess('');
        // reset error
        setRegisterError('');

        if (password.length < 6) {
            setRegisterError("Password should be at least 6 characters");
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setRegisterError('Your Password should has at least 1 upper case letter');
            return;
        }
        else if (!termsAccept) {
            setRegisterError('Please accept our Terms and Conditions');
            return;
        }

        // create user
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setSuccess('User Created Successfully')

                // update profile
                updateProfile(result.user, {
                    displayName: name,
                    photoURL: ''
                })
                    .then(() => console.log('Profile Updated'))
                    .catch()

                // send verification email
                sendEmailVerification(result.user)
                    .then(() => {
                        alert('Please check your email and verify your account')
                    })
            })
            .catch(error => {
                console.error(error);
                setRegisterError(error.massage);
            })
    }

    return (
        <div>
            <div className="mx-auto md:w-1/2">
                <h2 className="text-3xl mb-3">Register</h2>
                <form onSubmit={handleRegister}>
                    <div className="my-4">
                        <input className="border w-full px-2 py-3" type="email" placeholder="Your Email" name="email" id="" required />
                        <br />
                        <input className="border mt-4 w-full px-2 py-3" type="text" placeholder="Your Name" name="name" id="" required />
                    </div>
                    <div className="relative border">
                        <input
                            className="w-full px-2 py-3"
                            type={showPassword ? "text" : "password"}
                            placeholder="Your Password"
                            name="password"
                            id=""
                            required />
                        <span className="absolute top-4 right-3" onClick={() => setShowPassword(!showPassword)}>
                            {
                                showPassword ? <FaEyeSlash /> : <FaEye />
                            }
                        </span>
                    </div>
                    <br />
                    <input className="mb-4" type="checkbox" name="terms" id="terms" />
                    <label className="ml-2" htmlFor="terms">Accept Our <a href="">Terms and Conditions</a></label>
                    <br />
                    <input className="btn btn-primary w-full" type="submit" value="register" />
                    <div>
                        {
                            registerError && <p className="text-red-700">{registerError}</p>
                        }
                        {
                            success && <p className="text-blue-700">{success}</p>
                        }
                        <p>
                            Already have an account? Please <Link to='/login'>Login</Link>
                        </p>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default Register;
import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Authform = ({ isLoginPage }) => {
  const navigate = useNavigate();
  const [inputs, setInput] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput((values) => ({ ...values, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validate = () => {
    if(!isLoginPage){
        const newErrors = {};
        if (!inputs.name) {
          newErrors.name = "Name is required.";
        } else if (inputs.name.length < 3) {
          newErrors.name = "Name must be at least 3 characters long.";
        }
        if (!inputs.email) {
          newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(inputs.email)) {
          newErrors.email = "Email address is invalid.";
        }
        if (!inputs.password) {
          newErrors.password = "Password is required.";
        } else if (inputs.password.length < 6) {
          newErrors.password = "Password must be at least 6 characters.";
        }
        return newErrors;
    }else{
        const newErrors = {};
        if (!inputs.email) {
          newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(inputs.email)) {
          newErrors.email = "Email address is invalid.";
        }
        if (!inputs.password) {
          newErrors.password = "Password is required.";
        } else if (inputs.password.length < 6) {
          newErrors.password = "Password must be at least 6 characters.";
        }
        return newErrors;
    }
  };

  const handleSubmit = (e) => {
    if(!isLoginPage){
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          return;
        }
    
        axios
          .post(`${import.meta.env.VITE_REGISTER_URL}`, inputs)
          .then(function (response) {
            if (response.data.status === 0) {
              setErrors({ email: response.data.message });
            } else {
              navigate("/");
            }
          })
          .catch(function (error) {
            console.error("There was an error during registration!", error);
          });
    }
    else{
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          return;
        }
    
        axios
          .post(`${import.meta.env.VITE_LOGIN_URL}`, inputs)
          .then(function (response) {
            if (response.data.status === 0) {
              setErrors({ email: response.data.message });
            } else {
              navigate("/");
            }
          })
          .catch(function (error) {
            console.error("There was an error during login!", error);
          });
    }
   
  };
  return (
    <>
      <section>
        <div>
          <div className="font-[sans-serif] bg-white max-w-4xl flex items-center mx-auto md:h-screen p-4">
            <div className="grid md:grid-cols-3 items-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden">
              <div className="max-md:order-1 pl-10 flex flex-col justify-center space-y-16 max-md:mt-16 min-h-full bg-gradient-to-r from-gray-900 to-gray-700 lg:px-8 px-4 py-4">
                <div>
                  <h4 className="text-white text-lg font-semibold">
                    Create Your Account
                  </h4>
                  <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">
                    Welcome to our registration page! Get started by creating
                    your account.
                  </p>
                </div>
                <div>
                  <h4 className="text-white text-lg font-semibold">
                    Simple & Secure Registration
                  </h4>
                  <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">
                    Our registration process is designed to be straightforward
                    and secure. We prioritize your privacy and data security.
                  </p>
                </div>
              </div>

              <form
                className="md:col-span-2 w-full py-6 px-6 sm:px-16"
                name="registrationForm"
                onSubmit={handleSubmit}
                method="POST"
              >
                <div className="mb-6">
                  <h3 className="text-gray-800 text-2xl font-bold">
                    {isLoginPage ? "Login Here!" : "Create Your Account"}
                  </h3>
                </div>

                <div className="space-y-6">
                  {!isLoginPage && (
                    <div>
                      <label className="text-gray-800 text-sm mb-2 block">
                        Username
                      </label>
                      <div className="relative flex items-center">
                        <input
                          name="name"
                          type="text"
                          onChange={handleChange}
                          required
                          className={`text-gray-800 bg-white border ${
                            errors.name ? "border-red-500" : "border-gray-300"
                          } w-full text-sm px-4 py-2.5 rounded-md outline-blue-500`}
                          placeholder="Enter username"
                        />
                      </div>
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-4">
                          {errors.name}
                        </p>
                      )}
                    </div>
                  )}

                  <div>
                    <label className="text -gray-800 text-sm mb-2 block">
                      Email Address
                    </label>
                    <div className="relative flex items-center">
                      <input
                        name="email"
                        type="email"
                        onChange={handleChange}
                        required
                        className={`text-gray-800 bg-white border ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        } w-full text-sm px-4 py-2.5 rounded-md outline-blue-500`}
                        placeholder="Enter email"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-4">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-gray-800 text-sm mb-2 block">
                      Password
                    </label>
                    <div className="relative flex items-center">
                      <input
                        name="password"
                        type="password"
                        onChange={handleChange}
                        required
                        className={`text-gray-800 bg-white border ${
                          errors.password ? "border-red-500" : "border-gray-300"
                        } w-full text-sm px-4 py-2.5 rounded-md outline-blue-500`}
                        placeholder="Enter password"
                      />
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-xs mt-4">
                        {errors.password}
                      </p>
                    )}
                  </div>
                </div>

                <div className="!mt-12">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 tracking-wider text-sm rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none"
                  >
                    {isLoginPage ? 'Login' : 'Create an account'}
                  </button>
                </div>
                {isLoginPage ? (
                  <>
                    <p className="text-gray-800 text-sm mt-6 text-center">
                      Don't have an account?
                      <Link
                        to={"/register"}
                        className="text-blue-600 font-semibold hover:underline ml-1"
                      >
                        Register here
                      </Link>
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-gray-800 text-sm mt-6 text-center">
                      Already have an account?
                      <Link
                        to={"/login"}
                        className="text-blue-600 font-semibold hover:underline ml-1"
                      >
                        Login here
                      </Link>
                    </p>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Authform;

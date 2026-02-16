/**
 * Form.jsx - Login / Sign Up form (toggle between modes)
 * Validates email, password (strength), confirm password, and name (sign up only).
 * On submit, logs credentials to console; no backend integration.
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Form() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Per-field validation functions; used on change and on submit
  const validators = {
    email: (val) => {
      if (!val.trim()) return "Email is required";
      if (!emailPattern.test(val)) return "Please enter a valid email address";
      return "";
    },
    password: (val) => {
      if (!val) return "Password is required";
      if (val.length < 8) return "Password must be at least 8 characters";
      if (!passwordPattern.test(val))
        return "Password must contain uppercase, lowercase, number, and special character";
      return "";
    },
    confirmPassword: (val, fd) => {
      if (!val) return "Please confirm your password";
      if (val !== fd.password) return "Passwords do not match";
      return "";
    },
    name: (val) => {
      if (!val.trim()) return "Full name is required";
      if (val.trim().length < 2) return "Name must be at least 2 characters";
      if (!/^[a-zA-Z\s]+$/.test(val)) return "Name can only contain letters and spaces";
      return "";
    },
  };

  // Run validator for one field and update errors state
  const validateField = (name, value) => {
    const validator = validators[name];
    if (!validator) return;
    const err = validator(value, formData);

    setErrors((prev) => {
      const next = { ...prev };
      if (err) next[name] = err;
      else delete next[name];
      return next;
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({...prev,[name]: value,}));
    validateField(name, value);
  };

  // Validate all relevant fields for current mode (login vs sign up)
  const validateForm = () => {
    const fields = isLogin
      ? ["email", "password"]
      : ["name", "email", "password", "confirmPassword"];

    const newErrors = {};
    fields.forEach((f) => {
      const err = validators[f](formData[f], formData);
      if (err) newErrors[f] = err;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (isLogin) {
      console.log("Login:", {
        email: formData.email,
        password: formData.password,
      });
    } else {
      console.log("Signup:", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 mb-6  transition-colors "
          >
            <img
              width="20"
              height="20"
              src="https://img.icons8.com/ios-glyphs/30/circled-left-2.png"
              alt="circled-left-2"
            />
            Back to Home
          </button>
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            {isLogin ? "Login" : "Sign Up"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required={!isLogin}
                  placeholder="Enter your full name"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.name
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
            )}

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {!isLogin && (
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required={!isLogin}
                  placeholder="Confirm your password"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.confirmPassword
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setFormData({
                    email: "",
                    password: "",
                    confirmPassword: "",
                    name: "",
                  });
                }}
                className="text-blue-500 hover:text-blue-700 font-semibold ml-2 cursor-pointer"
              >
                {isLogin ? "Sign Up" : "Login"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

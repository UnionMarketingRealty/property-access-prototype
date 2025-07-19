import React, { useState, ChangeEvent, FormEvent, useRef } from 'react';

interface FormData {
  name: string;
  email: string;
  password: string;
}

const SignInForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
  });

  const [touchedEmail, setTouchedEmail] = useState(false);
  const [touchedPassword, setTouchedPassword] = useState(false);
  const auth_hint = useRef<HTMLParagraphElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'email') {
      setTouchedEmail(true);
    }
    if (name === 'password'){
      setTouchedPassword(true);
    } 
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Registering:', formData);
    if (auth_hint.current){
        auth_hint.current.textContent = "there's no account under this email, please register";
        console.log('Login failed: not an user');
    }
  };

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isValidPassword = (password: string) =>
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$/.test(password);


  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 mb-10 bg-white p-6 rounded-2xl shadow-md"
    >
      <h2 className="text-2xl font-semibold text-center mb-6">Sign In</h2>
      <p 
        ref={auth_hint}
        className="text-center text-sm text-red-600 mt-1"> 
        {''}</p>

      {/* Name Field */}
      <label htmlFor="name" className="block font-medium mb-1">
        Name
      </label>
      <input
        type="text"
        name="name"
        id="name"
        required
        value={formData.name}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Email Field */}
      <label htmlFor="email" className="block mt-4 font-medium mb-1">
        Email
      </label>
      <input
        type="email"
        name="email"
        id="email"
        required
        value={formData.email}
        onChange={handleChange}
        className={`w-full px-4 py-2 border ${
          !isValidEmail(formData.email) && touchedEmail
            ? 'border-red-500'
            : 'border-gray-300'
        } rounded-lg focus:outline-none focus:ring-2 ${
          !isValidEmail(formData.email) && touchedEmail
            ? 'focus:ring-red-500'
            : 'focus:ring-blue-500'
        }`}
      />
      {touchedEmail && formData.email && !isValidEmail(formData.email) && (
        <p className="text-sm text-red-600 mt-1">
          Please enter a valid email address (e.g. john@example.com)
        </p>
      )}

      {/* Password Field */}
      <label htmlFor="password" className="block mt-4 font-medium mb-1">
        Password
      </label>
      <input
        type="password"
        name="password"
        id="password"
        required
        value={formData.password}
        onChange={handleChange}
        className={`w-full px-4 py-2 border ${
          !isValidPassword(formData.password) && touchedPassword
            ? 'border-red-500'
            : 'border-gray-300'
        } rounded-lg focus:outline-none focus:ring-2 ${
          !isValidPassword(formData.password) && touchedPassword
            ? 'focus:ring-red-500'
            : 'focus:ring-blue-500'
        }`}
      />
      {touchedPassword && formData.password && !isValidPassword(formData.password) && (
        <p className="text-sm text-red-600 mt-1">
          Password must be at least 8 characters long and include a letter, a number, and a special character.
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 mt-6 rounded-lg transition-colors duration-300"
      >
        Sign In
      </button>

      <a href='/sign-in'>
        <p className="mt-5 text-center text-sm underline font-medium text-gray-400 hover:text-sky-700 cursor-pointer">
            Don't Have an Account? Register Here --&gt;</p>
      </a>
    </form>
  );
};

export default SignInForm;


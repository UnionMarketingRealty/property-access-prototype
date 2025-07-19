import React, { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  name: string;
  email: string;
  password: string;
}

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Registering:', formData);
    // Add validation or API request here
  };

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md"
    >
      <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>

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
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

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
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 mt-6 rounded-lg transition-colors duration-300"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;

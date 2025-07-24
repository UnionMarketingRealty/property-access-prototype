import React, { useState, ChangeEvent, FormEvent, useRef, useEffect } from 'react';

interface FormData {
  email: string;
  password: string;
}

type User = {
  id: number;
  name:string;
  email: string;
  password: string;
};

const SignInForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const [touchedEmail, setTouchedEmail] = useState(false);
  const [touchedPassword, setTouchedPassword] = useState(false);
  const auth_hint = useRef<HTMLParagraphElement>(null);
  const welcome_ref = useRef<HTMLHeadingElement>(null);

  // pw, email, username match users in db
  const [success,setSuccess] = useState(false);
  // fetched user data from backend
  const [user,setUser] = useState<User | null>(null);

  //fetch data from json-server users
  /*const [users,setUsers] = useState(null);
  useEffect(()=>{
    fetch(`http://localhost:8000/users`)
    .then(res =>{
      return res.json();
    })
    .then((data)=>{
      setUsers(data);
      console.log(`fetched user data from server`);
      console.log(data);
    })
  },[]);*/

  //after DOM had welcome_ref,change title
  useEffect(() => {
  if (success && welcome_ref.current && user) {
    welcome_ref.current.textContent = `Welcome, ${user.name}!`;
    console.log(`Signed In as ${user.name}`);
  }
  }, [success]);

  //accept terms
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const handleAcceptTerms = () => {
    setTermsAccepted(true);
    setShowTermsModal(false);
  };

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //prevent unvalid data check
    if ((touchedEmail && formData.email && !isValidEmail(formData.email)
       ||touchedPassword && formData.password && !isValidPassword(formData.password))
       && auth_hint.current){
      setSuccess(false);
      auth_hint.current.textContent = "wrong email or password format, please retry";
    }else if(auth_hint.current){
      //check if is a user, todo
      try {
        const response = await fetch(
          `https://property-access-json-server.onrender.com/users?email=${formData.email}&password=${formData.password}`
        )
        const data: User[] = await response.json();
        //console a list of paired user, if none paired return []
        console.log(data);

        if (data.length > 0) {
          auth_hint.current.textContent =`Welcome, ${data[0].name}!`;
          setSuccess(true); //make sure welcome_ref is already in DOM
          setUser(data[0]); //stored user data that matches from backend
          sessionStorage.setItem('login_user', JSON.stringify(data[0]));
        } else {
          auth_hint.current.textContent ='Invalid username or password.';
          console.log('Invalid username or password');
        }
      } catch (err) {
        console.log('error catched!');
      }
    }
  };

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isValidPassword = (password: string) =>
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$/.test(password);


  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 min-h-[500px] flex items-center">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-black/40"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1600)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {success?(
          //After Signed In
          <div className="max-w-md mx-auto mt-10 mb-10 bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-2xl font-semibold text-center mb-6"
                ref={welcome_ref}>
              {'You Are Signed In!'}</h2>
            <button
            onClick={()=>window.location.href='/'}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 mt-6 rounded-lg transition-colors duration-300"
          >
            Naviage Now
          </button>
          </div>
        ) : (
          //Sign In Form
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto mt-10 mb-10 bg-white p-6 rounded-2xl shadow-md"
        >
          <h2 className="text-2xl font-semibold text-center mb-6">Sign In</h2>
          <p 
            ref={auth_hint}
            className="text-center text-sm text-red-600 mt-1"> 
            {''}</p>

          {/* Email Field */}
          <label htmlFor="email" className="block mt-4 font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            placeholder="test@example.com"
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
              Please enter a valid email address (e.g. tester@example.com)
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
            placeholder="123456@test"
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

          {/* Term Aknowledge */}
          <div className="mt-5 flex items-center space-x-4">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
              <label className="text-sm">I acknowledge and accept the {' '} 
                <span 
                  onClick={()=>setShowTermsModal(true)}
                  className="text-sky-600 font-medium underline underline-offset-1 cursor-pointer">
                  terms</span>
              </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!termsAccepted}
            className={`w-full text-white font-semibold py-2 px-4 mt-6 rounded-lg transition-colors duration-300
              ${termsAccepted?`bg-blue-600 hover:bg-blue-700`:`bg-gray-300`}`}
          >
            Sign In
          </button>

          <a href='/register'>
            <p className="mt-5 text-center text-sm underline font-medium text-gray-400 hover:text-sky-700 cursor-pointer">
                Don't Have an Account? Register Here --&gt;</p>
          </a>
        </form>
      )}
    </div>

    {showTermsModal && (
      <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-xl max-w-md space-y-4 shadow-lg">
          <h3 className="text-lg font-bold">Terms and Agreements</h3>
          <div className="text-sm max-h-64 overflow-y-auto text-gray-700">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat.

              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat.

              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat.

              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="mt-2">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur.
            </p>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setShowTermsModal(false)}
              className="px-4 py-2 text-gray-600 hover:text-black"
            >
              Cancel
            </button>
            <button
              onClick={handleAcceptTerms}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    )}
  </section>
  );
};

export default SignInForm;


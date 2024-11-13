"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSession } from '../utils/session';



export default function Login() {
  const router = useRouter()

  // route protection
  async function checkSession(){
    const session = await getSession();

    if (session) {
      router.push('/browse');
    }
  }

  useEffect(() => {
    checkSession()
  },[])

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          pword: formData.password
        })
      });

      const data = response.json()

      console.log(data)


      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Handle successful login
      if (response.ok) {
        // You can redirect here or handle the successful login as needed
        console.log('Login successful:');
        router.push("/browse")
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-80 bg-white rounded-lg shadow-lg p-6 box-border">
        <h1 className="text-center font-bold text-2xl mb-6">Login</h1>
        
        <div className="form-container">
          <p className="title text-center text-xl font-extrabold mb-6">Welcome back</p>
          
          <form className="form flex flex-col gap-4 mb-4" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input border border-gray-300 rounded-full p-3 focus:ring-2 focus:ring-teal-500"
              placeholder="Email"
              required
            />
            
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input border border-gray-300 rounded-full p-3 focus:ring-2 focus:ring-teal-500"
              placeholder="Password"
              required
            />
            
            <p className="page-link text-right text-sm underline text-gray-600 hover:text-black">
              Forgot Password?
            </p>
            
            <button 
              type="submit"
              disabled={loading}
              className="form-btn bg-teal-500 text-white py-2 rounded-full font-semibold shadow-md hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Log in'}
            </button>
          </form>
          
          <p className="mt-24 text-sm text-gray-600">
            Don't have an account?{' '}
            <span className="sign-up-link text-teal-600 font-bold cursor-pointer underline hover:text-teal-700">
              <button onClick={() => router.push("/signup")}> 
                Sign up
              </button>
              
            </span>
          </p>
        </div>
      </div>
    </main>
  );
}
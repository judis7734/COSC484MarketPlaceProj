"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { CheckCircle, User, Home, Mail, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getSession } from '../utils/session';

export default function SignUp() {
  const router = useRouter()

  // route protection
  // async function checkSession(){
  //   const session = await getSession();

  //   if (session) {
  //     router.push('/browse');
  //   }
  // }

  // useEffect(() => {
  //   checkSession()
  // },[])

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    phone: '',
    age: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const steps = [
    { number: 1, title: 'Personal Info', icon: User },
    { number: 2, title: 'Contact', icon: Mail },
    { number: 3, title: 'Address', icon: Home },
    { number: 4, title: 'Security', icon: Lock }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateStep = () => {
    const { fname, lname, age, email, phone, street, city, state, zipcode, password, confirmPassword } = formData;

    switch (step) {
      case 1:
        if (!fname || !lname) {
          return 'First and Last Name are required';
        }
        if (!age.match(/^\d+$/)) {
          return 'Age must be a numeric value';
        }
        break;
      case 2:
        if (!email.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)) {
          return 'Please enter a valid email address';
        }
        if (!phone.match(/^\d{10,15}$/)) {
          return 'Phone number must be between 10 and 15 digits';
        }
        break;
      case 3:
        if (!street || !city || !state || !zipcode) {
          return 'All address fields are required';
        }
        if (!state.match(/^[A-Z]{2}$/)) {
          return 'State must be two uppercase letters';
        }
        if (!zipcode.match(/^\d{5}(-\d{4})?$/)) {
          return 'Enter a valid ZIP code';
        }
        break;
      case 4:
        if (!password) {
          return 'Password is required';
        }
        if (password !== confirmPassword) {
          return 'Passwords do not match';
        }
        break;
      default:
        return '';
    }
    return '';
  };

  const nextStep = () => {
    const validationError = validateStep();
    if (validationError) {
      setError(validationError);
    } else {
      setError('');
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setError('');
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateStep();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await axios.post('/api/create_user', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(response);

      if (response.data.success) {
        // Handle successful signup
        router.push("/browse")
        // Redirect or show success message
      }
    } catch (err) {
      setError(
        err.response?.data?.error || 
        'An error occurred during signup'
      );
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                {error}
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="fname"
                value={formData.fname}
                onChange={handleChange}
                placeholder="First Name"
                className="col-span-1 w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-teal-400"
                required
              />
              <input
                type="text"
                name="lname"
                value={formData.lname}
                onChange={handleChange}
                placeholder="Last Name"
                className="col-span-1 w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-teal-400"
                required
              />
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Age"
                className="col-span-2 w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-teal-400"
                required
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                {error}
              </div>
            )}
            <div className="space-y-4">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-teal-400"
                required
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-teal-400"
                required
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Address</h2>
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                {error}
              </div>
            )}
            <div className="space-y-4">
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                placeholder="Street Address"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-teal-400"
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-teal-400"
                  required
                />
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-teal-400"
                  required
                />
              </div>
              <input
                type="text"
                name="zipcode"
                value={formData.zipcode}
                onChange={handleChange}
                placeholder="Zip Code"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-teal-400"
                required
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Security</h2>
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                {error}
              </div>
            )}
            <div className="space-y-4">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-teal-400"
                required
              />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-teal-400"
                required
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-4xl w-full mx-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Progress Steps */}
          <div className="p-6 bg-teal-500 text-white">
            <div className="flex justify-between items-center">
              {steps.map((s, i) => (
                <div key={s.number} className="flex flex-col items-center relative">
                  <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center mb-2
                    ${step > s.number ? 'bg-white text-teal-500' : 
                      step === s.number ? 'border-white text-white' : 
                      'border-teal-300 text-teal-300'}`}>
                    {step > s.number ? <CheckCircle className="w-6 h-6" /> : <s.icon className="w-6 h-6" />}
                  </div>
                  <span className="text-sm font-medium">{s.title}</span>
                  {i < steps.length - 1 && (
                    <div className={`absolute top-5 left-full w-full h-0.5 -ml-2
                      ${step > s.number ? 'bg-white' : 'bg-teal-300'}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="p-8">
              {renderStepContent()}
            </div>

            {/* Navigation Buttons */}
            <div className="px-8 pb-8 flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className={`px-6 py-3 rounded-lg font-medium transition-colors
                  ${step === 1 ? 'invisible' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
              >
                Previous
              </button>

              {step < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 bg-teal-500 text-white rounded-lg font-medium hover:bg-teal-600 transition-colors"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-teal-500 text-white rounded-lg font-medium hover:bg-teal-600 transition-colors disabled:bg-teal-300"
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="text-center mt-6 text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="font-medium text-teal-600 hover:underline">
            Log in
          </a>
        </div>
      </div>
    </main>
  );
}

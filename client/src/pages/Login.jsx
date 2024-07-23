import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Textbox from '../components/Textbox';
import Button from '../components/Button';
import { setCredentials } from '../redux/slices/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

 
  const user = useSelector((state) => state.auth.user);

  const submitHandler = async (data) => {
    console.log('submit', data);
    dispatch(setCredentials(data));
    navigate('/dashboard');
  };

  useEffect(() => {
    if (user) {
      console.log('User:', user);
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="w-full min-h-screen flex items-center flex-col lg:flex-row bg-[#f3f4f6]">
      <div className="w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center">
        {/* left side start */}
        <div className="h-full w-full lg:w-2/3 flex flex-col items-center justify-center mt-10"> {/* Added mt-10 */}
          <div className="w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20">
            <span className="flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base border-gray-300 text-gray-600">
              Manage all your task in one place!
            </span>
            <p className="flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-blue-700">
              <span>Fixnow</span>
              <span>Customer relationship management</span>
            </p>
            <div className="cell">
              <div className="circle rotate-in-up-left"></div>
            </div>
          </div>
        </div>
        {/* left side end */}

        {/* right side start */}
        <div className="w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center">
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 py-14 pb-14"
          >
            <div>
              <p className='text-blue-600 text-3xl font-bold text-center'>welcome back!</p>
              <p className='text-center text-base text-gray-700 '>
                Keep all your credentials safe.
              </p>
            </div>
            <div className="flex flex-col gap-y-5">
              <Textbox
                placeholder="email@example.com"
                type="email"
                name="email"
                label="Email address"
                className='w-full rounded-full'
                register={register("email", { required: "Email Address is required!" })}
                error={errors.email ? errors.email.message : ""}
              />
              <Textbox
                placeholder='your password'
                type='password'
                name='password'
                label='Password'
                className='w-full rounded-full'
                register={register("password", { required: "Password is required!" })}
                error={errors.password ? errors.password.message : ""}
              />
              <span className='text-sm text-gray-500 hover:text-blue-600 hover:underline cursor-pointer'>
                Forget Password?
              </span>
              <Button
                type='submit'
                label='Login'
                className='w-full h-10 bg-blue-700 text-white rounded-full'
              />
            </div>
          </form>
        </div>
        {/* right side end */}
      </div>
    </div>
  );
};

export default Login;

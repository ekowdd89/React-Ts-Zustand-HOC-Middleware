import React from 'react';
import { useAuthStore } from '../store/authStore';

const Dashboard: React.FC = () => {

    const {user, logout} = useAuthStore();
  return (
    <>
        <div className='flex flex-col p-2 items-center w-full'>
            <div className='text-2xl text-indigo-600'>Welcome {user} to Dashboard </div>
            <button onClick={logout} className='p-2 bg-indigo-600 text-white rounded-md'>Logout</button>
        </div>
    </>
  )
};

export default Dashboard;

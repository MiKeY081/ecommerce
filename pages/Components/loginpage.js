// components/Login.js
import { useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react"
import { toast } from 'react-toastify';

const Login = ({ child }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        onClick = {toast.success("Login Successful")}
            >
        Login
      </button>
    </form>
  );
};

export default Login;

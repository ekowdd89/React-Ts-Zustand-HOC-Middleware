# React + TypeScript + Vite
## Simple HOC + Zustand + Middleware

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```


simple useAuthStore
```js

import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

type AuthState = {
    user: string | null | undefined,
    login:(username: string) => void
    logout:() => void
}
export const useAuthStore = create<AuthState>() (
    devtools(
        persist(
            (set)=> ({
                user: null,
                login: (username)=> {
                    set({user: username})
                },
                logout: () => set({user: null})
            }),
            {
                name: 'auth-storage'
            }
        )
    )
)

```

simple HOC

```js
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"
import { useAuthStore } from "../store/authStore"
import { Navigate } from "react-router-dom"

export function withAuth<T extends object>(Component: React.ComponentType<T>) {
    return (props: T) => {
        const user = useAuthStore((state) => state.user)
        if(!user){
            return <Navigate to="/signin" />
        }
        return <Component {...props} />
    }
}


```


implementation 

```js


import { Route, Routes } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { SignIn } from './pages/auth/SignIn'
import { SignUp } from './pages/auth/SignUp'
import ProtectedDashboard from './pages/protected/ProtectedDashboard'

function App() {

  return (
    <>
      <div className='flex flex-col min-h-screen'>
          <Navbar/>
          <main className='p-4'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path='/signin' element={<SignIn/>} />
              <Route path='/signup' element={<SignUp/>} />
              <Route path='/dashboard' element={<ProtectedDashboard />} />
            </Routes>
          </main>
      </div>
    </>
  )
}

export default App





import { useAuthStore } from "../../store/authStore"
import { useNavigate } from 'react-router-dom';
export const SignIn = () => {
    const {user, login} = useAuthStore();
    const navigate = useNavigate();

    const onLogin = () => {
        login("admin")
        navigate("/dashboard")
    }
    return (
        <>

            <div>SignIn {user ?? "no user"} </div>

            <button onClick={onLogin}>Login</button>

        </>

    )
}



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




import Dashboard from "../Dashboard";
import { withAuth } from "../../hoc/withAuth";



const ProtectedDashboard = withAuth(Dashboard);

export default ProtectedDashboard

```
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
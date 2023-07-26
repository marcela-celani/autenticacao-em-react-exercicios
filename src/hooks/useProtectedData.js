import { useEffect } from "react"
import { goToLogin } from '../routes/coordinator'
import { useNavigate } from "react-router-dom";

export const useProtectedData = () => {
    const token = localStorage.getItem('token')
    
    const navigate = useNavigate();
    useEffect(()=> {
        if(!token){
            goToLogin(navigate)
        }
    },[])
}
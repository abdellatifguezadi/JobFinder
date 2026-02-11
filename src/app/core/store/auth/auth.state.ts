import { User } from "../../model/user";

export interface authState{
    user : User | null ;
    error : string | null ;
    loading  : boolean;
    isAuthenticated : boolean;
}


const getUserFromLocalStorage = (): User | null => {
    const userJson = localStorage.getItem('user');
    if (userJson) {
        try {
            return JSON.parse(userJson) as User;
        } catch {
            return null;
        }
    }
    return null;
};

export const initialAuthState : authState = {
    user : getUserFromLocalStorage(),
    error : null,   
    loading : false,
    isAuthenticated : getUserFromLocalStorage() !== null
};




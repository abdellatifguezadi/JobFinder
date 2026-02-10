import { User } from "../../../core/model/user";

export interface authState{
    user : User | null ;
    error : string | null ;
    loading  : boolean;
    isAuthenticated : boolean;
}


export const initialAuthState : authState = {
    user : null,
    error : null,   
    loading : false,
    isAuthenticated : false
};




import { createAction, props } from "@ngrx/store";
import { LoginRequest } from "../../../core/dto/login-request";
import { User } from "../../../core/model/user";
import { RegisterRequest } from "../../../core/dto/register-request";


export const login = createAction(
    '[login] login',
    props<{ credentials: LoginRequest }>()
);


export const loginSucces = createAction(
    '[login] login succes',
    props<{user : User}>()
); 


export const loginFailure = createAction(
    '[login] login failure ',
    props<{error : string}>()
);


export const register = createAction(
    '[register] register',
    props<{ request: RegisterRequest }>()
);


export const registerSucces = createAction(
    '[register] register succes',
    props<{user : User}>()
); 


export const registerFailure = createAction(
    '[register] register failure ',
    props<{error : string}>()
);



export const  logout = createAction(
    '[logout]  logout' 
);



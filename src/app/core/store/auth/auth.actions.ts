import { createAction, props } from "@ngrx/store";
import { LoginRequest } from "../../dto/login-request";
import { User } from "../../model/user";
import { RegisterRequest } from "../../dto/register-request";


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

export const updateUser = createAction(
    '[updateUser] update user',
    props<{ user: User }>()
);

export const updateUserSuccess = createAction(
    '[updateUser] update user success',
    props<{ user: User }>()
);

export const updateUserFailure = createAction(
    '[updateUser] update user failure',
    props<{ error: string }>()
);





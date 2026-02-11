import { createReducer, on } from '@ngrx/store'
import * as authAction from './auth.actions'
import { initialAuthState } from './auth.state'

export const authReducer = createReducer(
    initialAuthState,
    on(authAction.login , (state) => ({
        ...state,
        loading : true,
        error : null
    })),

    on(authAction.loginSucces , (state , {user})=> ({
        ...state,
        user:user,
        loading:false,
        error : null,
        isAuthenticated: true
    })),

    on(authAction.loginFailure , (state, {error} )=>({
        ...state ,
        error : error,
        loading : false,
        isAuthenticated: false
    })),

    on(authAction.register,(state)=>({
        ...state,
        loading:true,
        error:null
    })),

    on(authAction.registerSucces , (state , {user})=> ({
        ...state,
        user:user,
        loading:false,
        error : null,
        isAuthenticated: true
    })),

    on(authAction.registerFailure , (state, {error})=>({
        ...state ,
        error : error,
        loading : false
    })),

    on(authAction.logout , (state) => ({
        ...state,
        user : null,
        isAuthenticated: false,
        error : null
    })),

    on(authAction.updateUser , (state) => ({
        ...state,
        loading : true,
        error : null
    })),

    on(authAction.updateUserSuccess , (state , {user}) => ({
        ...state,
        user : user,
        loading : false,
        error : null
    })),

    on(authAction.updateUserFailure , (state , {error}) => ({
        ...state,
        loading : false,
        error : error
    })),

    on(authAction.changePassword, (state) => ({
        ...state,
        loading: true,
        error: null
    })),

    on(authAction.changePasswordSuccess, (state) => ({
        ...state,
        loading: false,
        error: null
    })),

    on(authAction.changePasswordFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error: error
    }))
)

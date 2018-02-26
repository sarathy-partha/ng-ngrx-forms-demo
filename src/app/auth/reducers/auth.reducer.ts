import { Action } from "@ngrx/store";
import { SET_AUTHENTICATED, SET_UNAUTHENTICATED, AuthActions } from '../actions/auth.actions';

export interface State {
    isAuthenticated: boolean;
}

const initialState: State = {
    isAuthenticated: false
}

export function authReducer(state = initialState, action: AuthActions) {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                isAuthenticated: true
            };
        case SET_UNAUTHENTICATED:
            return {
                isAuthenticated: false
            }
        default: return state
    }
}

export const getAuthStatus = (state: State) => {
    return state.isAuthenticated;
}

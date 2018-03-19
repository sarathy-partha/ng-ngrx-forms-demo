import { Action } from "@ngrx/store";
import { UIActions, START_LOADING, STOP_LOADING, SET_THEME } from './ui.actions';

export interface State {
    isLoading: boolean;
    currentTheme: string;
}

const initialState: State = {
    isLoading: false,
    currentTheme: 'container'
}

export function uiReducer(state = initialState, action: UIActions) {
    switch (action.type) {
        case START_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case STOP_LOADING:
            return {
                ...state,                
                isLoading: false
            }
        case SET_THEME:
            return {
                ...state,
                currentTheme: action.payload
            }
        default: return state
    }
}

export const getIsLoading = (state: State) => {
    return state.isLoading;
}

export const getCurrentTheme = (state: State) => {
    return state.currentTheme;
}

import { Action } from "@ngrx/store";

export const START_LOADING = '[UI] Start Loading';
export const STOP_LOADING = '[UI] Stop Loading';

export const SET_THEME = '[UI] Set Theme';

export class StartLoading implements Action {
    readonly type = START_LOADING;
}

export class StopLoading implements Action {
    readonly type = STOP_LOADING;
}

export class SetTheme implements Action {
    readonly type = SET_THEME;
    constructor(public payload: string) { console.log(payload)}
}

export type UIActions = StartLoading | StopLoading | SetTheme;

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null
}

export type initialStateType = typeof initialState

export const appReducer = (state: initialStateType = initialState, action: actionType): initialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        default:
            return state
    }
}

export type actionType = ReturnType<typeof setAppStatus> | ReturnType<typeof setAppError>

export const setAppStatus = (status: RequestStatusType) => {
    return {
        type: 'APP/SET-STATUS',
        status
    } as const
}

export const setAppError = (error: string | null) => {
    return {
        type: 'APP/SET-ERROR',
        error
    } as const
}
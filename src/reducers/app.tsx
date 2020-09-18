import { appTypes } from '../types';

export interface State {
    data: object[];
    searchLoading: boolean;
    trendingButtongLoading: boolean
}
const INITIAL_STATE: State = {
    data: [],
    searchLoading: false,
    trendingButtongLoading: false
}

type Action = { type: appTypes.QUERY_GIFY, payload: object[] }
    | { type: appTypes.TRIGGER_QUERY_GIFY }
    | { type: appTypes.TRIGGER_TRENDING_GIFY }
    | { type: appTypes.QUERY_TRENDING_GIFY, payload: object[] };

export default (state: State = INITIAL_STATE, action: Action): State => {
    switch (action.type) {
        case appTypes.QUERY_GIFY:
            return { ...state, data: action.payload, searchLoading: false };
        case appTypes.TRIGGER_QUERY_GIFY:
            return { ...state, searchLoading: true };
        case appTypes.TRIGGER_TRENDING_GIFY:
            return { ...state, trendingButtongLoading: true };
        case appTypes.QUERY_TRENDING_GIFY:
            return { ...state, data: action.payload, trendingButtongLoading: false };
        default:
            return state;
    }
}
import { combineReducers } from 'redux';
import app, { State } from './app';

export interface STORE {
    app: State;
}
export default combineReducers<STORE>({
    app
})
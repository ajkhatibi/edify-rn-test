
export interface State {

}
const INITIAL_STATE: State = {

}

export default (state = INITIAL_STATE, action): State => {
    switch (action.type) {

        default:
            return state;
    }
}
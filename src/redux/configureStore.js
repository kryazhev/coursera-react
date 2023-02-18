import { createStore } from "redux";
import { Reducer, initialState } from "./reducer";

export const CofigureStore = () => {
    return createStore(Reducer, initialState);
}
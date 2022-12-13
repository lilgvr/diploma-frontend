import { combineReducers } from "redux";
import { mainReducer } from "./mainReducer";
import { userReducer } from "./userReducer";
import { movieReducer } from "./movieReducer";

export const rootReducer = combineReducers({
    main: mainReducer,
    user: userReducer,
    movie: movieReducer
});

export type RootState = ReturnType<typeof rootReducer>

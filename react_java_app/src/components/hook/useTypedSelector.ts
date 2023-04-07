import { TypedUseSelectorHook, useSelector } from "react-redux";
import { rootReducer } from "../../store";


type rootState = ReturnType<typeof rootReducer>;
export const useTypedSelector: TypedUseSelectorHook<rootState> = useSelector;
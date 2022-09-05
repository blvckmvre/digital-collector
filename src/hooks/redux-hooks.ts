import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authSlice from "../store/slices/auth/auth-slice";
import { DispatchType, RootState } from "../store/store";

export const useTypeSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useTypeDispatch = () => useDispatch<DispatchType>();

export const useAuthInput = (type: "login" | "sign up") => {
  const { loginPassword, loginUsername, signupPassword, signupUsername } =
    useTypeSelector((state) => state.auth);
  const {
    setLoginPassword,
    setLoginUsername,
    setSignupPassword,
    setSignupUsername,
  } = authSlice.actions;
  return type === "login"
    ? ([
        loginUsername,
        setLoginUsername,
        loginPassword,
        setLoginPassword,
      ] as const)
    : ([
        signupUsername,
        setSignupUsername,
        signupPassword,
        setSignupPassword,
      ] as const);
};

export const useError = () => {
  const { error: authError } = useTypeSelector((state) => state.auth);
  const { error: searchError } = useTypeSelector((state) => state.book_search);
  const { error: booksError } = useTypeSelector((state) => state.books);
  const { error: usersError } = useTypeSelector((state) => state.users);
  const { error: tradeError } = useTypeSelector((state) => state.trades);
  return authError || searchError || booksError || usersError || tradeError;
};

export const useLoading = () => {
  const { isLoading: authLoading } = useTypeSelector((state) => state.auth);
  const { isLoading: booksLoading } = useTypeSelector((state) => state.books);
  const { isLoading: usersLoading } = useTypeSelector((state) => state.users);
  const { isLoading: tradeLoading } = useTypeSelector((state) => state.trades);
  return authLoading || booksLoading || usersLoading || tradeLoading;
};

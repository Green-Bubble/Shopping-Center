import { useCallback, useReducer } from "react";

export type AsyncMeta<T = unknown> = {
  success: boolean;
  data?: T;
  error?: Error;
};

export type AsyncAction<T = unknown, V extends unknown[] = unknown[]> = [
  action: (...args: V) => Promise<T | undefined>,
  loading: boolean,
  meta: AsyncMeta<T>
];

type State<T = unknown> = {
  loading: boolean;
  success: boolean;
  error?: Error;
  data?: T;
};

enum LoadingStateActionType {
  Loading = "LOADING",
  Error = "ERROR",
  Success = "SUCCESS",
}

type Action<T = unknown> = {
  type: LoadingStateActionType;
  error?: Error;
  data?: T;
};

function buildReducer<T = unknown>() {
  return (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case LoadingStateActionType.Loading:
        return {
          loading: true,
          success: false,
        };
      case LoadingStateActionType.Success:
        return {
          loading: false,
          success: true,
          data: action.data,
        };
      case LoadingStateActionType.Error:
        return {
          loading: false,
          success: false,
          error: action.error,
        };
      default:
        throw new Error("Un-Implemented action type");
    }
  };
}

export default function useAsyncAction<
  T = unknown,
  V extends unknown[] = unknown[]
>(
  func: (...args: V) => Promise<T>,
  onSuccess?: (data: T, args: V) => void,
  onError?: (err: Error) => void
): AsyncAction<T, V> {
  const initialState: State<T> = {
    loading: false,
    success: false,
  };

  const [state, dispatch] = useReducer(buildReducer<T>(), initialState);
  const action = useCallback(
    async (...args: V) => {
      dispatch({ type: LoadingStateActionType.Loading });

      try {
        const data = await func(...args);
        dispatch({ type: LoadingStateActionType.Success, data });

        if (onSuccess) {
          onSuccess(data, args);
        }

        return data;
      } catch (err: any) {
        dispatch({ type: LoadingStateActionType.Error, error: err });

        if (onError) {
          onError(err);
        }
      }
    },
    [func, onError, onSuccess]
  );

  return [
    action,
    state.loading,
    {
      data: state.data,
      error: state.error,
      success: state.success,
    },
  ];
}

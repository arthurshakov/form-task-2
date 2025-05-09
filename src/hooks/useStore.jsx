import { useState } from 'react';

const initialState = {
  email: '',
  password: '',
  password2: '',
};

const initialErrors = {
  email: null,
  password: null,
  password2: null,
}

export const useStore = () => {
    const [state, setState] = useState(initialState);
    const [errors, setErrors] = useState(initialErrors);

    return {
        getState: () => state,
        getErrors: () => errors,

        updateState: (fieldName, newValue) => {
          setState({ ...state, [fieldName]: newValue });
        },
        updateErrors: (errorName, newValue) => {
          setErrors({ ...errors, [errorName]: newValue });
        },

        resetState: () => setState(initialState),
    };
};

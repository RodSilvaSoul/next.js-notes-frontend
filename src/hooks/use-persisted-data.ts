import { setCookie } from 'nookies';
import {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';

type Response<T> = [T, Dispatch<SetStateAction<T>>];

export const userPersistedData = <T = any>(
  key: string,
  initialData: T,
  defaultValue: T,
): Response<T> => {
  const [state, setState] = useState<T>(() => {
    if (Object.keys(initialData).length) {
      return initialData;
    }
    return defaultValue;
  });

  useEffect(() => {
    setCookie(null, key, JSON.stringify(state), {
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    });
  }, [state, key]);

  return [state, setState];
};

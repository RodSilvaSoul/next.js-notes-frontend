import nookies from 'nookies';
import {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';

type Response<T> = [T, Dispatch<SetStateAction<T>>];

export const userPersistedData = <T = any>(
  key: string,
  initialData: T,
): Response<T> => {
  const [state, setState] = useState<T>(() => {
    const data = nookies.get(null, key) as unknown as string;
    if (data) {
      return JSON.parse(data);
    }
    return initialData;
  });

  useEffect(() => {
    nookies.set(null, key, JSON.stringify(initialData), {
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    });
  }, [state, key]);

  return [state, setState];
};

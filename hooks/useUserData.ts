import { AppDispatch } from '../services/state/store';
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/services/state/store";
import { clearUserData, fetchUserData } from '@/services/state/user/userSlice';

export const useUserData = () => {

  const { data: userData, status, error } = useSelector((state: RootState) => state.userData)
  const user = useSelector((state: RootState) => state.authState.user)
  const dispatch = useDispatch<AppDispatch>();

  const previousUserRef = useRef(user);

  useEffect(() => {
    const userChanged = previousUserRef.current !== user;

    if (user?.uid && (status === 'idle' || userChanged)) {
      if (userChanged) {
        dispatch(clearUserData());

      }
      dispatch(fetchUserData({ collectionName: 'users', id: user.uid }))
    }

    previousUserRef.current = user;
  }, [user, status, dispatch]);

  return { userData, status, error };
};

import { AppDispatch } from './../services/state/store';
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/services/state/store";
import { clearUserData, fetchUserData } from '@/services/state/user/userSlice';

export const useFetchUserData = () => {

  const { data: userData, status, error } = useSelector((state: RootState) => state.userData)
  const user = useSelector((state: RootState) => state.authState.user)
  const dispatch = useDispatch<AppDispatch>();

  // Use a ref to track the previous user to handle changes correctly
  const previousUserRef = useRef(user);

  useEffect(() => {
    // The fetch condition is met if:
    // 1. We have a user AND
    // 2. The status is idle OR the user has changed
    const userChanged = previousUserRef.current !== user;

    if (user?.uid && (status === 'idle' || userChanged)) {
      if (userChanged) {
        // Optionally reset the state if the user changes
        dispatch(clearUserData());

      }
      dispatch(fetchUserData({ collectionName: 'users', id: user.uid }))
    }

    previousUserRef.current = user;
  }, [user, status, dispatch]);

  return { userData, status, error };
};

import { AppDispatch } from './../services/state/store';
import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { AuthContextProps } from "@/services/providers/AuthProvider";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/services/state/store";
import { fetchUserData } from '@/services/state/user/userSlice';

export const useFetchUserData = () => {
  const {
    authState: { user },
  } = useAuth() as AuthContextProps;

  const userData = useSelector((state: RootState) => state.userData)
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (user?.uid && userData.status === 'idle') {
      dispatch(fetchUserData({ collectionName: 'users', id: user.uid }))
      // console.log('Fetching user data for uid:');

    }
  }, [user, userData.status, dispatch]);

  return { userData };
};

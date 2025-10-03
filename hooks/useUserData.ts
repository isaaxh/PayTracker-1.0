import { useQuery } from '@tanstack/react-query';
import { useAuth } from './useAuth';
import { createUserQueryOptions } from '@/utils/queryOptions/createUserQueryOptions';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/services/state/store';
import { useEffect, useRef } from 'react';
import { clearUserData, fetchUserData } from '@/services/state/user/userSlice';

export const useUserData = () => {
  const { user } = useAuth()

  return useQuery(createUserQueryOptions(user?.uid ?? '', { enabled: !!user?.uid }))
};
import { useState } from 'react';

export interface UserInterface {
  email: string;
}

export type IUseUserData = [UserInterface | undefined, () => void];

export const useUserData = (initialState: UserInterface | undefined): IUseUserData => {
  const [user, setUser] = useState<UserInterface | undefined>(initialState);

  const handleLogOut = () => setUser(undefined);

  return [user, handleLogOut];
};

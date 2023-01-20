// import { useUserData } from '../hooks/UseUserData';
import { createContext } from 'react';
// import { DefaultProps } from '../components/util/types';
import { UserInterface } from '../hooks/UseUserData';

export const UserContext = createContext<UserInterface | undefined>(undefined);

// export const UserProvider: FC<DefaultProps> = ({ children }) => {
//   const ctx = useUserData(undefined);

//   return <UserContext.Provider value={...ctx}>{children}</UserContext.Provider>;
// };

import { createContext, useState, type ReactNode } from "react";

interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

type UsersContextType = {
  users: User[];
  setUsers: (value: User[]) => void;
};

export const UsersContext = createContext<UsersContextType>({
  users: [],
  setUsers: () => {},
});

export function UsersProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  console.log(users);
  return (
    <UsersContext.Provider value={{ users, setUsers }}>
      {children}
    </UsersContext.Provider>
  );
}

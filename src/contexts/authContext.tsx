import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type User = {
  id: number;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // On mount, load from sessionStorage
  useEffect(() => {
    const loggedIn = sessionStorage.getItem('login_user');
    if (loggedIn){ 
        try{
        setUser(JSON.parse(loggedIn));
        }catch(err){
            console.log(err);
        }
    }
  }, []);


  // Sync sessionStorage whenever user changes
  useEffect(() => {
    if (user) {
      sessionStorage.setItem('login_user', JSON.stringify(user));
    }
  }, [user]);

  // Logout logic
  const logout = () => {
    sessionStorage.removeItem('login_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser,logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
};

import { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser ] = useState(() => {
        const storedUser = localStorage.getItem('staff');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const login = (userData, token) => {
        setUser(userData);
        localStorage.setItem('staff', JSON.stringify(userData));
        localStorage.setItem('token', token);
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem('staff');
        localStorage.removeItem('token');
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;


import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    signInWithPhoneNumber,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const [googleToken, setGoogleToken] = useState(localStorage.getItem('google_drive_token') || null);

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout() {
        localStorage.removeItem('patientHealthProfileRisk');
        localStorage.removeItem('patientHealthProfileNew');
        localStorage.removeItem('patientHealthProfile');
        localStorage.removeItem('google_drive_token');
        setGoogleToken(null);
        return signOut(auth);
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    async function loginWithGoogle() {
        const provider = new GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/drive.file');
        try {
            const result = await signInWithPopup(auth, provider);
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            setGoogleToken(token);
            localStorage.setItem('google_drive_token', token);
            return result;
        } catch (error) {
            console.error("Google Login Error:", error);
            throw error;
        }
    }

    const value = {
        currentUser,
        googleToken,
        login,
        loginWithGoogle,
        signup,
        logout,
        resetPassword,
        signInWithPhone: (phoneNumber, appVerifier) => signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

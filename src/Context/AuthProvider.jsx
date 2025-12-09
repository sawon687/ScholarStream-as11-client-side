import React, { Children, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import auth from '../Farebase/farebase.init';

const googleprovider = new GoogleAuthProvider();
const AuthProvider = ({children}) => {
const[loading,setLoading]=useState(false)
const [user,setUser]=useState(null)
    const createUser=(email,password)=>{
         setLoading(false)
       return createUserWithEmailAndPassword(auth,email,password)
    }

    const signupUser=(email,password)=>{
      setLoading(false)
      return signInWithEmailAndPassword(auth,email,password)
    }
    const ProfileUpadate=(userProfile)=>{
       return updateProfile(auth.currentUser,userProfile)
    }
    const signOutUser=()=>{
      return signOut(auth)
    }
    const googleSignup=()=>{
      return signInWithPopup(auth,googleprovider)
    }
   useEffect(()=>{
       const unsubscirbe= onAuthStateChanged(auth,(currenUser)=>{
             setUser(currenUser)
            
             setLoading(true)
      })

      return()=>{
            unsubscirbe()
      }
   },[])

   console.log('user=',user)

    const info={
      createUser,
      user,
      signupUser,
      ProfileUpadate,
      signOutUser,
      loading,
      googleSignup,
    }

     console.log(user)
    return (
        <div>
            <AuthContext value={info}>{children}</AuthContext>
        </div>
    );
};

export default AuthProvider;
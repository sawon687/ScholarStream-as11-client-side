import React, { Children, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import auth from '../Farebase/farebase.init';


const AuthProvider = ({children}) => {
const[loading,setLoading]=useState(false)
const [user,setUser]=useState(null)
    const createUser=(email,password)=>{
         setLoading(false)
       return createUserWithEmailAndPassword(auth,email,password)
    }

    const signupUser=(email,password)=>{
      return signInWithEmailAndPassword(auth,email,password)
    }
   useEffect(()=>{
       return onAuthStateChanged(auth,(currenUser)=>{
             setUser(currenUser)
      })
   },[])
    const info={
      createUser,
      user,
      signupUser,
    }

     console.log(user)
    return (
        <div>
            <AuthContext value={info}>{children}</AuthContext>
        </div>
    );
};

export default AuthProvider;
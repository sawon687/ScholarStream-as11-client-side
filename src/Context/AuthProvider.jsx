import React, { Children, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import auth from '../Farebase/farebase.init';


const AuthProvider = ({children}) => {
const[loading,setLoading]=useState(false)
const [user,setUser]=useState(null)
    const createUser=(email,password)=>{
         setLoading(false)
       return createUserWithEmailAndPassword(auth,email,password)
    }
    const info={
      createUser,
      user,
    }
    return (
        <div>
            <AuthContext value={info}>{children}</AuthContext>
        </div>
    );
};

export default AuthProvider;
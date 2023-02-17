import React, { useState } from 'react'
import { BiImage } from "react-icons/bi"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {storage, auth, db} from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [err, setErr] = useState(false);
  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            // setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      // setLoading(false);
    }
  };

  return (
    <div className='formContainer'>
        <div className='formWrapper'>
            <span className="logo"><Link to="/">helloJii</Link></span>
            <span className="title">Register</span>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter Your Name" />
                <input type="email" placeholder="Enter Your Email" />
                <input type="password" placeholder="Enter Your Password" />
                <input type="file"id="file" />
                <label htmlFor="file">
                  <BiImage className='formImg'/>
                  Choose your image
                </label>
                <button>Sign up</button>
                {err && <span>Something went wrong! Please try again!</span>}
            </form>
            <p className="">Already have an account? <Link to="/login">Login</Link></p>
        </div>
    </div>
  )
}

export default Register
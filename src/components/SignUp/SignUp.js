

import React from 'react';
import styles from './SignUp.module.scss';

export default function SignUp({
  credentials,
  signUp,
  handleChangeAuth
}) {
  return (
    <div className={styles.SignUp}>
      <h2></h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        signUp();
      }}>
        <input type='text' value={credentials.email} name='email' onChange={handleChangeAuth} placeholder='Email' className={styles.input} />
        <input type='text' value={credentials.name} name='name' onChange={handleChangeAuth} placeholder='Name' className={styles.input} />
        <input type='password' value={credentials.password} name='password' onChange={handleChangeAuth} placeholder='Password' className={styles.input} />
        <input type='submit' value='Sign Up' className={styles.submit} />
      </form>
    </div>
  );
}

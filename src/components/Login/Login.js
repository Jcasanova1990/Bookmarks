// Login.js

import styles from './Login.module.scss';

export default function Login({
  login,
  credentials,
  handleChangeAuth
}) {
  return (
    <div className={styles['login-form']}>
      <h2></h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        login();
      }}>
        <input
          type='text'
          value={credentials.email}
          name='email'
          onChange={handleChangeAuth}
          className={styles['email-input']}
          placeholder='Email'
        />
        <input
          type='password'
          value={credentials.password}
          name='password'
          onChange={handleChangeAuth}
          className={styles['password-input']}
          placeholder='Password'
        />
        <input type='submit' value='Login' />
      </form>
    </div>
  );
}

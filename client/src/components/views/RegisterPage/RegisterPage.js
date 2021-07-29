import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';

function RegisterPage(props) {

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  }

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  }

  const onPasswordConfirmHandler = (event) => {
    setPasswordConfirm(event.currentTarget.value);
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (password !== passwordConfirm) {
      return alert('비번이 다릅니다');
    }

    const body = {
      email,
      name,
      password,
    }

    dispatch(registerUser(body))
    .then(response => {
      if (response.payload.success) {
        props.history.push('/login')
      } else {
        alert('가입 실패');
      }
    })

  }



  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'
    }}>
      <form style={{ display: 'flex', flexDirection: 'column'}}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={email} onChange={onEmailHandler} />
        <label>Name</label>
        <input type="name" value={name} onChange={onNameHandler} />
        <label>Password</label>
        <input type="password" value={password} onChange={onPasswordHandler} />
        <label>Password Confirm</label>
        <input type="password" value={passwordConfirm} onChange={onPasswordConfirmHandler} />
        <br />
        <button type="submit">
          회원가입
        </button>
      </form>
    </div>
  )
}

export default RegisterPage

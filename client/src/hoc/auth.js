import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action'

// eslint-disable-next-line import/no-anonymous-default-export
export default function(SpecificComponent, option, adminRoute = null) {
  
  console.log('hello')
  // null   => 아무나 출입 가능
  // true   => 로그인한 유저만 가능
  // false  => 로그인 안한 유저만 가능


  function AuthenticationCheck(props) {

    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(auth())
      .then(response => {
        console.log(response)
      })
    }, [])

    return (
      <SpecificComponent />
    )

  }


  return AuthenticationCheck
}
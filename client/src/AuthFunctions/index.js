import axios from 'axios';
import { Redirect } from 'react-router-dom';
import React, { Component } from 'react';


export function setHeader(){
  const token = sessionStorage.getItem('jwttoken');
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

export function redirectToLogin(){
  return <Redirect to='/'/>
}

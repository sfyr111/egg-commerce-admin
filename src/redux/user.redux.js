/**
 * create by yangran on 2018/3/1
 */

import api from '../common/api/service'
import { ERR_OK } from '../common/api/config'
import { message } from 'antd'
// import { Dispatch } from 'redux'

const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const GET_USER_SESSION = 'GET_USER_SESSION'
// const ERROR_MSG = 'ERROR_MSG'

const initState = {
  redirectTo: '',
  id: '',
  username: '',
  email: '',
  phone: '',
  role: ''
}

export function user(state = initState, action) {
  switch (action.type) {
    case LOGIN: {
      return { ...state, ...action.payload }
    }
    case LOGOUT: {
      return {}
    }
    case GET_USER_SESSION: {
      return { ...state, ...action.payload }
    }
    default: {
      return state
    }
  }
}

// ⚠️actionType⚠️
// function getUserInfo(userInfo) {
//   return { type: GET_USER_INFO, payload: userInfo }
// }

export function setUserSession(userInfo) {
  return { type: GET_USER_SESSION, payload: userInfo }
}

export function login(data) {
  return (dispatch) => {
    api.post(`/manage/user/login`, data)
      .then(res => {
        if (res.status === ERR_OK) dispatch({ type: LOGIN, payload: res.data })
        else message.error(res.msg)
      })
  }
}

export function logout() {
  return (dispatch) => {
    api.get(`/user/logout`)
      .then(res => {
        if (res.status === ERR_OK) dispatch({ type: LOGOUT })
        else message.error(res.msg)
      })
  }
}


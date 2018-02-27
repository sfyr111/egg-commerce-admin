import api from '../common/api/service'
// import { Dispatch } from 'redux'

const GET_USER_INFO = 'GET_USER_INFO'
// const ERROR_MSG = 'ERROR_MSG'

const initState = {}

// ⚠️reducer⚠️
export function user(state = initState, action) {
  switch (action.type) {
    case GET_USER_INFO: {
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

// ⚠️handle⚠️
export function getUserInfo(state) {
  const { userToken } = state
  if (!userToken) return console.log('userToken is empty')
  return (dispatch) => {
    api.post(`/user/userToken/${userToken}`)
      .then(res => {
        if (res.code === 0) dispatch({ type: GET_USER_INFO, payload: res.data.user })
        else alert('获取用户信息出错')
      })
  }
}


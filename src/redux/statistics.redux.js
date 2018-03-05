/**
 * create by yangran on 2018/3/1
 */

import api from '../common/api/service'
import { ERR_OK } from '../common/api/config'
// import { Dispatch } from 'redux'

const GET_COUNT = 'GET_COUNT'
// const ERROR_MSG = 'ERROR_MSG'

const initState = {}

export function statistics(state = initState, action) {
  switch (action.type) {
    case GET_COUNT: {
      return { ...state, ...action.payload }
    }
    default: {
      return state
    }
  }
}

export function getCount() {
  return (dispatch) => {
    api.get(`/manage/count`)
      .then(res => {
        if (res.status === ERR_OK) dispatch({ type: GET_COUNT, payload: res.data })
        else alert(res.msg)
      })
  }
}


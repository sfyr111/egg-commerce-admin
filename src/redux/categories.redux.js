/**
 * create by yangran on 2018/3/2
 */

import api from '../common/api/service'
import { ERR_OK } from '../common/api/config'
// import { Dispatch } from 'redux'

const GET_CATEGORIES = 'GET_CATEGORIES'
const SET_CURRENT = 'SET_CURRENT'
// const ERROR_MSG = 'ERROR_MSG'

const initState = {
  list: [],
  current: {}
}

export function categories(state = initState, action) {
  switch (action.type) {
    case GET_CATEGORIES: {
      return { ...state, list: [ ...action.payload ] }
    }
    case SET_CURRENT: {
      return { ...state, current: action.payload }
    }
    default: {
      return state
    }
  }
}

export function setCurrentCategories(item) {
  return { type: SET_CURRENT, payload: item }
}

export function getCategories(id) {
  return (dispatch) => {
    api.get(`/manage/category/parentId/${id}`)
      .then(res => {
        if (res.status === ERR_OK) dispatch({ type: GET_CATEGORIES, payload: res.data })
        else alert(res.msg)
      })
  }
}


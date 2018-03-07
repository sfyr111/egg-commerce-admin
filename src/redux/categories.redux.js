/**
 * create by yangran on 2018/3/2
 */

import api from '../common/api/service'
import { ERR_OK } from '../common/api/config'
import { message } from 'antd'
// import { Dispatch } from 'redux'

const GET_CATEGORIES = 'GET_CATEGORIES'
const SET_CURRENT = 'SET_CURRENT'
// const ERROR_MSG = 'ERROR_MSG'

const initState = {
  list: [],
  current: {
    parentId: 0
  }
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

function getCategoriesReducer(data) {
  return { type: GET_CATEGORIES, payload: data}
}

export function getCategories(parentId = 0) {
  return (dispatch, getState) => {
    // const { parentId } = getState().categories.current
    api.get(`/manage/category/parentId/${parentId}`)
      .then(res => {
        if (res.status === ERR_OK) dispatch(getCategoriesReducer(res.data))
        else message.error(res.msg)
      })
  }
}

export function updataCategorie(id, name) {
  return (dispatch) => {
    api.put('/manage/category/updateCategoryName', { id, name })
      .then(res => {
        if (res.status === ERR_OK) dispatch(getCategoriesReducer(res.data))
        else message.error(res.msg)
      })
  }
}

export function addCategorie(id, name) {
  return () => {
    api.post('/manage/category/addCategory', { name, parentId: id })
      .then(res => {
        if (res.status === ERR_OK) message.success(res.msg)
        else message.error(res.msg)
      })
  }
}

/**
 * create by yangran on 2018/3/1
 */

import { combineReducers } from 'redux'
import { user } from './redux/user.redux'
import { statistics } from './redux/statistics.redux'
import { categories } from './redux/categories.redux'

export default combineReducers({ user, statistics, categories })

import React from 'react'
import api from '../../common/api/service'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { setUserSession } from '../../redux/user.redux'
import { ERR_OK } from '../../common/api/config'

@withRouter // 可以看到当前this.props.history 的信息
@connect(
  null,
  { setUserSession }
)
class AuthRoute extends React.Component {
  componentDidMount() {
    const publicList = ['/login']
    const pathname = this.props.location.pathname
    if (publicList.indexOf(pathname) > -1) return null // 在login register 下不需要获取用户信息}
    // 获取用户信息
    api.get('/user/getUserSession')
      .then(res => {
        if (res.status === ERR_OK) {
          // 有登陆信息
          this.props.setUserSession(res.data)
        } else {
          this.props.history.push('/login')
        }
      })
  }

  render () {
    return null
  }
}

export default AuthRoute

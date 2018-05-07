import vume from 'vume'
import service from '../../service/CommentApiService'

export default vume.module({
  name: 'comment',
  state: {
    commentDetail: [],
    commentList: []
  },
  service,
  asyncs: {
    addComment: () => new Promise((resolve, reject) => {
      setTimeout(resolve, 3000)
    })
  },
  actions: {
    getCommentDetail() {
      
    },
    getCommentList() {

    }
  },
  mutations: {
    getCommentDetail(state, action) {
      return {
        commentDetail: action.payload.data,
        ...state
      }
    },
    getCommentList(state, action) {
      return {
        commentList: action.payload.data,
        ...state
      }
    }
  }
})
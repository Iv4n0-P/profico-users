import reqres from '../apis/reqres'

export const fetchUsers = (pageNum) => {
    return async (dispatch, getState) => {
        const { data } = await reqres.get('/users', { params: { page: pageNum } })
        dispatch({
            type: 'SET_USERS',
            payload: data.data
        })
    }
}
import { Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { tokenExpired } from '../store/reducer/user'

const withAuth = (Component, role) => {
    return (props) => {
        const { isAuth, data } = useSelector((state) => state.users)
        const dispatch = useDispatch()

        if (!isAuth) {
            return <Navigate to="/login" />
        }

        if (role && data.role !== role) {
            return <Navigate to="/" />
        }

        const { response } = useSelector((state) => state.api);
        if (response && response.status === 400 && response.data && response.data.name === 'TokenExpiredError') {
            dispatch(tokenExpired());
            return <Navigate to="/" />;
        }

        return <Component {...props} />
    }
}

export default withAuth
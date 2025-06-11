import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute ({children, requiredRole}) {

    const user = useSelector(state => state.auth.user);

    if(user.role !== requiredRole){
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default ProtectedRoute;
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
const RouteLinks = (props) => {
	const { user } = useSelector((state) => state.AuthReducer);
	return user ? (
		<Redirect to='/dashboard' />
	) : (
		<Route path={props.path} exact={props.exact}>
            {props.children}
        </Route>
	);
};
export default RouteLinks;
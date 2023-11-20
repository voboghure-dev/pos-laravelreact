import { createBrowserRouter } from 'react-router-dom';
import Auth from '../layout/Auth';
import Login from '../modules/Login';
import Master from '../layout/Master';
import Dashboard from '../modules/Dashboard';
import Error500 from '../modules/Error500';
import Public from './Public';
import Protected from './Protected';
import CategoryList from '../modules/category/CategoryList';
import CategoryAdd from '../modules/category/CategoryAdd';
import CategoryEdit from '../modules/category/CategoryEdit';

const Router = createBrowserRouter([
	{
		path: '/dashboard',
		element: (
			<Protected>
				<Master />
			</Protected>
		),
		children: [
			{
				path: '/dashboard',
				element: <Dashboard />,
			},
			{
				path: '/dashboard/category/create',
				element: <CategoryAdd />,
			},
			{
				path: '/dashboard/category/edit/:id',
				element: <CategoryEdit />,
			},
			{
				path: '/dashboard/category',
				element: <CategoryList />,
			},
			{
				path: '/dashboard/error-500',
				element: <Error500 />,
			},
		],
	},
	{
		path: '/',
		element: (
			<Public>
				<Auth />
			</Public>
		),
		children: [
			{
				path: '/',
				element: <Login />,
			},
		],
	},
]);

export default Router;

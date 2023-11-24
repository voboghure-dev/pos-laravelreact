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
import SubCategoryList from '../modules/subCategory/SubCategoryList';
import SubCategoryAdd from '../modules/subCategory/SubCategoryAdd';
import SubCategoryEdit from '../modules/subCategory/SubCategoryEdit';
import BrandList from '../modules/brand/BrandList';
import BrandAdd from '../modules/brand/BrandAdd';
import BrandEdit from '../modules/brand/BrandEdit';
import SupplierAdd from '../modules/supplier/SupplierAdd';
import SupplierList from '../modules/supplier/SupplierList';

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
				path: '/dashboard/sub-category/create',
				element: <SubCategoryAdd />,
			},
			{
				path: '/dashboard/sub-category/edit/:id',
				element: <SubCategoryEdit />,
			},
			{
				path: '/dashboard/sub-category',
				element: <SubCategoryList />,
			},
			{
				path: '/dashboard/brand/create',
				element: <BrandAdd />,
			},
			{
				path: '/dashboard/brand/edit/:id',
				element: <BrandEdit />,
			},
			{
				path: '/dashboard/brand',
				element: <BrandList />,
			},
			{
				path: '/dashboard/supplier/create',
				element: <SupplierAdd />,
			},
			{
				path: '/dashboard/supplier/edit/:id',
				element: <BrandEdit />,
			},
			{
				path: '/dashboard/supplier',
				element: <SupplierList />,
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

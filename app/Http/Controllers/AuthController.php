<?php
namespace App\Http\Controllers;

use App\Http\Requests\AuthRequest;
use App\Models\SalesManager;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller {
	public const ADMIN_USER         = 1;
	public const SALES_MANAGER_USER = 2;
	/**
	 * Login
	 *
	 * @param AuthRequest $request
	 * @return \Illuminate\Http\JsonResponse
	 */
	final public function login( AuthRequest $request ) {
		if ( $request->role == self::ADMIN_USER ) {
			$user = ( new User() )->getUserByEmailOrPhone( $request->all() );
			$role = self::ADMIN_USER;
		} else {
			$user = ( new SalesManager() )->getUserByEmailOrPhone( $request->all() );
			$role = self::SALES_MANAGER_USER;
		}

		if ( $user && Hash::check( $request->input( "password" ), $user->password ) ) {
			$user_data['token'] = $user->createToken( $user->email )->plainTextToken;
			$user_data['name']  = $user->name;
			$user_data['email'] = $user->email;
			$user_data['phone'] = $user->phone;
			$user_data['photo'] = $user->photo;
			$user_data['role']  = $role;

			return response()->json( $user_data );
		}

		throw ValidationException::withMessages( [
			'email_or_phone' => ['The provided credentials are incorrect'],
		] );
	}

	/**
	 * Logout
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
	final public function logout() {
		auth()->user()->tokens()->delete();

		return response()->json( ['message' => 'You have successfully logged out!'] );
	}
}

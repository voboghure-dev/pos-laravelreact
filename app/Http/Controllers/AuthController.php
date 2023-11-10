<?php
namespace App\Http\Controllers;

use App\Http\Requests\AuthRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller {
	/**
	 * Login
     *
     * @param AuthRequest $request
     * @return \Illuminate\Http\JsonResponse
	 */
	final public function login( AuthRequest $request ) {
		$user = ( new User() )->getUserByEmailOrPhone( $request->all() );

		if ( $user && Hash::check( $request->input( "password" ), $user->password ) ) {
			$user_data['token'] = $user->createToken( $user->email )->plainTextToken;
			$user_data['name']  = $user->name;
			$user_data['email'] = $user->email;
			$user_data['phone'] = $user->phone;
			$user_data['photo'] = $user->photo;

			return response()->json( $user_data );
		}
		throw ValidationException::withMessages( [
			'email' => ['The provided credentials are incorrect'],
		] );
	}
}

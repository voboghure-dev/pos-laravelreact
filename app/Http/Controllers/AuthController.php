<?php
namespace App\Http\Controllers;

use App\Http\Requests\AuthRequest;

class AuthController extends Controller {
	/**
	 * Login
	 */
	public function login( AuthRequest $request ) {
		return $request;
	}
}

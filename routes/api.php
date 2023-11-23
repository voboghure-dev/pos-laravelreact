<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\SubCategoryController;
use App\Http\Controllers\SupplierController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
 */

Route::middleware( 'auth:sanctum' )->get( '/user', function ( Request $request ) {
	return $request->user();
} );

Route::post( 'login', [AuthController::class, 'login'] );

Route::group( ['middleware' => 'auth:sanctum'], static function () {
	Route::post( 'logout', [AuthController::class, 'logout'] );
	Route::get( 'get-category-list', [CategoryController::class, 'get_category_list'] );
	Route::apiResource( 'category', CategoryController::class );
	Route::apiResource( 'sub-category', SubCategoryController::class );
	Route::apiResource( 'brand', BrandController::class );
	Route::apiResource( 'supplier', SupplierController::class );
} );

<?php
namespace App\Http\Controllers;

use App\Http\Requests\StoreStoreRequest;
use App\Http\Requests\UpdateStoreRequest;
use App\Http\Resources\StoreEditResource;
use App\Http\Resources\StoreListResource;
use App\Manager\ImageManager;
use App\Models\Address;
use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class StoreController extends Controller {
	/**
	 * Display a listing of the resource.
	 */
	public function index( Request $request ) {
		$store = ( new Store() )->getAllStores( $request->all() );

		return StoreListResource::collection( $store );
	}

	/**
	 * Store a newly created resource in storage.
	 */
	public function store( StoreStoreRequest $request ) {
		$store_data   = ( new Store() )->prepareData( $request->all(), auth() );
		$address_data = ( new Address() )->prepareData( $request->all() );

		if ( $request->has( 'logo' ) ) {
			$file               = $request->logo;
			$name               = Str::slug( $store_data['name'] . '-' . time() );
			$path               = Store::IMAGE_UPLOAD_PATH;
			$path_thumb         = Store::THUMB_IMAGE_UPLOAD_PATH;
			$store_data['logo'] = ImageManager::imageUpload( $file, $name, $path, $path_thumb );
		}

		try {
			DB::beginTransaction();
			$store = Store::create( $store_data );
			$store->address()->create( $address_data );
			DB::commit();

			return response()->json( ['msg' => 'Store created successfully!', 'cls' => 'success'] );
		} catch ( \Throwable $th ) {
			ImageManager::deleteImage( $path, $store_data['logo'] );
			ImageManager::deleteImage( $path_thumb, $store_data['logo'] );
			DB::rollBack();

			return response()->json( ['msg' => 'Unable to create Store!', 'cls' => 'error'] );
		}
	}

	/**
	 * Display the specified resource.
	 */
	public function show( Store $store ) {
		$store = $store->load( 'address' );

		return new StoreEditResource( $store );
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update( UpdateStoreRequest $request, Store $store ) {
		$store_data   = ( new Store() )->prepareData( $request->all(), auth() );
		$address_data = ( new Address() )->prepareData( $request->all() );

		if ( $request->has( 'logo' ) ) {
			$name               = Str::slug( $store_data['name'] ) . '-' . time();
			$path               = Store::IMAGE_UPLOAD_PATH;
			$path_thumb         = Store::THUMB_IMAGE_UPLOAD_PATH;
			$store_data['logo'] = ImageManager::imageUpload( $request->logo, $name, $path, $path_thumb, $store->logo );
		}

		try {
			DB::beginTransaction();
			$store_data = $store->update( $store_data );
			$store->address()->update( $address_data );
			DB::commit();

			return response()->json( ['msg' => 'Store updated successfully!', 'cls' => 'success'] );
		} catch ( \Throwable $th ) {
			ImageManager::deleteImage( Store::IMAGE_UPLOAD_PATH, $store_data['logo'] );
			ImageManager::deleteImage( Store::THUMB_IMAGE_UPLOAD_PATH, $store_data['logo'] );
			DB::rollBack();

			return response()->json( ['msg' => 'Unable to update Store!', 'cls' => 'error'] );
		}
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy( Store $store ) {
		if (  ! empty( $store->logo ) ) {
			ImageManager::deleteImage( Store::IMAGE_UPLOAD_PATH, $store->logo );
			ImageManager::deleteImage( Store::THUMB_IMAGE_UPLOAD_PATH, $store->logo );
		}

		( new Address() )->deleteByStore( $store );
		$store->delete();

		return response()->json( ['msg' => 'Store deleted successfully!', 'cls' => 'warning'] );
	}

	public function get_store_list() {
		$stores = ( new Store() )->getStoreIdAndName();

		return response()->json( $stores );
	}
}

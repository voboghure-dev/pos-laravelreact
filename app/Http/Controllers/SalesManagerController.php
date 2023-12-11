<?php
namespace App\Http\Controllers;

use App\Http\Requests\StoreSalesManagerRequest;
use App\Http\Requests\UpdateSalesManagerRequest;
use App\Http\Resources\SalesManagerListResource;
use App\Manager\ImageManager;
use App\Models\Address;
use App\Models\SalesManager;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class SalesManagerController extends Controller {
	/**
	 * Display a listing of the resource.
	 */
	public function index( Request $request ) {
		$sales_mangers = ( new SalesManager() )->getAllSalesManagers( $request->all() );

		return SalesManagerListResource::collection( $sales_mangers );
	}

	/**
	 * Show the form for creating a new resource.
	 */
	public function create() {
		//
	}

	/**
	 * Store a newly created resource in storage.
	 */
	public function store( StoreSalesManagerRequest $request ) {
		$manager_data = ( new SalesManager() )->prepareData( $request->all(), auth() );
		$address_data = ( new Address() )->prepareData( $request->all() );

		if ( $request->has( 'photo' ) ) {
			$file                  = $request->photo;
			$name                  = Str::slug( $manager_data['name'] . '-' . time() );
			$path                  = SalesManager::PHOTO_UPLOAD_PATH;
			$path_thumb            = SalesManager::PHOTO_THUMB_UPLOAD_PATH;
			$manager_data['photo'] = ImageManager::imageUpload( $file, $name, $path, $path_thumb );
		}

		if ( $request->has( 'govt_id_photo' ) ) {
			$file                          = $request->govt_id_photo;
			$name                          = Str::slug( $manager_data['name'] . '-govt-' . time() );
			$path                          = SalesManager::GOVT_ID_UPLOAD_PATH;
			$path_thumb                    = SalesManager::GOVT_ID_THUMB_UPLOAD_PATH;
			$manager_data['govt_id_photo'] = ImageManager::imageUpload( $file, $name, $path, $path_thumb );
		}

		try {
			DB::beginTransaction();
			$manager = SalesManager::create( $manager_data );
			$manager->address()->create( $address_data );
			DB::commit();

			return response()->json( ['msg' => 'Store created successfully!', 'cls' => 'success'] );
		} catch ( \Throwable $th ) {
			if (  ! empty( $manager_data['photo'] ) ) {
				ImageManager::deleteImage( SalesManager::PHOTO_UPLOAD_PATH, $manager_data['photo'] );
				ImageManager::deleteImage( SalesManager::PHOTO_THUMB_UPLOAD_PATH, $manager_data['photo'] );
			}
			if (  ! empty( $manager_data['govt_id_photo'] ) ) {
				ImageManager::deleteImage( SalesManager::GOVT_ID_UPLOAD_PATH, $manager_data['govt_id_photo'] );
				ImageManager::deleteImage( SalesManager::GOVT_ID_THUMB_UPLOAD_PATH, $manager_data['govt_id_photo'] );
			}
			DB::rollBack();

			return response()->json( ['msg' => 'Unable to create Store!', 'cls' => 'error'] );
		}
	}

	/**
	 * Display the specified resource.
	 */
	public function show( SalesManager $salesManager ) {
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 */
	public function edit( SalesManager $salesManager ) {
		//
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update( UpdateSalesManagerRequest $request, SalesManager $salesManager ) {
		//
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy( SalesManager $salesManager ) {
		//
	}
}

<?php
namespace App\Http\Controllers;

use App\Http\Requests\StoreSupplierRequest;
use App\Http\Requests\UpdateSupplierRequest;
use App\Http\Resources\SupplierEditResource;
use App\Http\Resources\SupplierListResource;
use App\Manager\ImageManager;
use App\Models\Address;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class SupplierController extends Controller {
	/**
	 * Display a listing of the resource.
	 */
	public function index( Request $request ) {
		$suppliers = ( new Supplier() )->getAllSuppliers( $request->all() );

		return SupplierListResource::collection( $suppliers );
	}

	/**
	 * Store a newly created resource in storage.
	 */
	public function store( StoreSupplierRequest $request ) {
		$supplier_data = ( new Supplier() )->prepareData( $request->all(), auth() );
		$address_data  = ( new Address() )->prepareData( $request->all() );

		if ( $request->has( 'logo' ) ) {
			$name                  = Str::slug( $supplier_data['company_name'] ) . '-' . time();
			$path                  = Supplier::IMAGE_IMAGE_PATH;
			$path_thumb            = Supplier::THUMB_IMAGE_IMAGE_PATH;
			$supplier_data['logo'] = ImageManager::imageUpload( $request->input( 'logo' ), $name, $path, $path_thumb );
		}

		try {
			DB::beginTransaction();
			$supplier = Supplier::create( $supplier_data );
			$supplier->address()->create( $address_data );
			DB::commit();
		} catch ( \Throwable $th ) {
			ImageManager::deleteImage( Supplier::IMAGE_IMAGE_PATH, $supplier_data['logo'] );
			ImageManager::deleteImage( Supplier::THUMB_IMAGE_IMAGE_PATH, $supplier_data['logo'] );
			DB::rollBack();

			return response()->json( ['msg' => 'Unable to create Supplier!', 'cls' => 'error'] );
		}

		return response()->json( ['msg' => 'Supplier created successfully!', 'cls' => 'success'] );
	}

	/**
	 * Display the specified resource.
	 */
	public function show( Supplier $supplier ) {
		$supplier->load( 'address' );

		return new SupplierEditResource( $supplier );
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update( UpdateSupplierRequest $request, Supplier $supplier ) {
		$supplier_data = ( new Supplier() )->prepareData( $request->all(), auth() );
		$address_data  = ( new Address() )->prepareData( $request->all() );

		if ( $request->has( 'logo' ) ) {
			$name                  = Str::slug( $supplier_data['company_name'] ) . '-' . time();
			$path                  = Supplier::IMAGE_IMAGE_PATH;
			$path_thumb            = Supplier::THUMB_IMAGE_IMAGE_PATH;
			$supplier_data['logo'] = ImageManager::imageUpload( $request->input( 'logo' ), $name, $path, $path_thumb, $supplier->logo );
		}

		try {
			DB::beginTransaction();
			$supplier_data = $supplier->update( $supplier_data );
			$supplier->address()->update( $address_data );
			DB::commit();
		} catch ( \Throwable $th ) {
			ImageManager::deleteImage( Supplier::IMAGE_IMAGE_PATH, $supplier_data['logo'] );
			ImageManager::deleteImage( Supplier::THUMB_IMAGE_IMAGE_PATH, $supplier_data['logo'] );
			DB::rollBack();

			return response()->json( ['msg' => 'Unable to update Supplier!', 'cls' => 'error'] );
		}

		return response()->json( ['msg' => 'Supplier updated successfully!', 'cls' => 'success'] );
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy( Supplier $supplier ) {
		if (  ! empty( $supplier->logo ) ) {
			ImageManager::deleteImage( Supplier::IMAGE_IMAGE_PATH, $supplier->logo );
			ImageManager::deleteImage( Supplier::THUMB_IMAGE_IMAGE_PATH, $supplier->logo );
		}
		( new Address() )->deleteBySupplier( $supplier );
		$supplier->delete();

		return response()->json( ['msg' => 'Supplier deleted successfully', 'cls' => 'warning'] );
	}
}

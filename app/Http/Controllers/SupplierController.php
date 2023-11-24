<?php
namespace App\Http\Controllers;

use App\Http\Requests\StoreSupplierRequest;
use App\Http\Requests\UpdateSupplierRequest;
use App\Http\Resources\SupplierListResource;
use App\Manager\ImageManager;
use App\Models\Address;
use App\Models\Supplier;
use Illuminate\Http\Request;
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
			$name                  = Str::slug( $supplier_data['company_name'] );
			$path                  = Supplier::IMAGE_IMAGE_PATH;
			$path_thumb            = Supplier::THUMB_IMAGE_IMAGE_PATH;
			$supplier_data['logo'] = ImageManager::imageUpload( $request->input( 'logo' ), $name, $path, $path_thumb );
		}

		$supplier = Supplier::create( $supplier_data );
		$supplier->address()->create( $address_data );

		return response()->json( ['msg' => 'Supplier created successfully', 'cls' => 'success'] );
	}

	/**
	 * Display the specified resource.
	 */
	public function show( Supplier $supplier ) {
		//
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update( UpdateSupplierRequest $request, Supplier $supplier ) {
		//
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy( Supplier $supplier ) {
		//
	}
}

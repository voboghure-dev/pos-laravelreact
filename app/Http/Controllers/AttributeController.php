<?php
namespace App\Http\Controllers;

use App\Http\Requests\StoreAttributeRequest;
use App\Http\Requests\UpdateAttributeRequest;
use App\Http\Resources\AttributeListResource;
use App\Models\Attribute;
use Illuminate\Http\Request;

class AttributeController extends Controller {
	/**
	 * Display a listing of the resource.
	 */
	public function index( Request $request ) {
		$attributes = ( new Attribute() )->getAllAttributes( $request->all() );

		return AttributeListResource::collection( $attributes );
	}

	/**
	 * Store a newly created resource in storage.
	 */
	public function store( StoreAttributeRequest $request ) {
		$attribute_data = ( new Attribute() )->prepareData( $request->all(), auth() );
		Attribute::create( $attribute_data );

		return response()->json( ['msg' => 'Attribute create successfully', 'cls' => 'success'] );
	}

	/**
	 * Display the specified resource.
	 */
	public function show( Attribute $attribute ) {
		//
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update( UpdateAttributeRequest $request, Attribute $attribute ) {
		//
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy( Attribute $attribute ) {
		$attribute->delete();

		return response()->json( ['msg' => 'Attribute deleted successfully', 'cls' => 'warning'] );
	}
}

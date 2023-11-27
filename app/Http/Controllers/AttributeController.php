<?php
namespace App\Http\Controllers;

use App\Http\Requests\StoreAttributeRequest;
use App\Http\Requests\UpdateAttributeRequest;
use App\Models\Attribute;

class AttributeController extends Controller {
	/**
	 * Display a listing of the resource.
	 */
	public function index() {
		//
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
	 * Show the form for editing the specified resource.
	 */
	public function edit( Attribute $attribute ) {
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
		//
	}
}

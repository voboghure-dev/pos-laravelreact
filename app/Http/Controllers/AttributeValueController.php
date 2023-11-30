<?php
namespace App\Http\Controllers;

use App\Http\Requests\StoreAttributeValueRequest;
use App\Http\Requests\UpdateAttributeValueRequest;
use App\Models\AttributeValue;

class AttributeValueController extends Controller {
	/**
	 * Display a listing of the resource.
	 */
	public function index() {
		//
	}

	/**
	 * Store a newly created resource in storage.
	 */
	public function store( StoreAttributeValueRequest $request ) {
		$attribute_value            = $request->all();
		$attribute_value['user_id'] = auth()->id();
		AttributeValue::create( $attribute_value );

		return response()->json( ['msg' => 'Attribute value created successfully', 'cls' => 'success'] );
	}

	/**
	 * Display the specified resource.
	 */
	public function show( AttributeValue $attributeValue ) {
		//
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update( UpdateAttributeValueRequest $request, AttributeValue $attributeValue ) {
		//
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy( AttributeValue $attributeValue ) {
		//
	}
}

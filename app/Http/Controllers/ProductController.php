<?php
namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use App\Models\ProductAttribute;
use App\Models\ProductSpecification;

class ProductController extends Controller {
	/**
	 * Display a listing of the resource.
	 */
	public function index() {
		//
	}

	/**
	 * Store a newly created resource in storage.
	 */
	public function store( StoreProductRequest $request ) {
		$product = ( new Product() )->prepareData( $request->all(), auth()->id() );
		if ( $request->has( 'attributes' ) ) {
			$product_attributes = ( new ProductAttribute() )->prepareData( $request->input( 'attributes' ) );
		}
		if ( $request->has( 'specifications' ) ) {
			$product_specifications = ( new ProductSpecification() )->prepareData( $request->input( 'specifications' ) );
		}

		return $request->all();
	}

	/**
	 * Display the specified resource.
	 */
	public function show( Product $product ) {
		//
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update( UpdateProductRequest $request, Product $product ) {
		//
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy( Product $product ) {
		//
	}
}

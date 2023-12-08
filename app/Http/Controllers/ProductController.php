<?php
namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use App\Models\ProductAttribute;
use App\Models\ProductSpecification;
use Error;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller {
	/**
	 * Display a listing of the resource.
	 */
	public function index( Request $request ) {
		return $products = ( new Product() )->getAllProducts( $request->all() );
	}

	/**
	 * Store a newly created resource in storage.
	 */
	public function store( StoreProductRequest $request ) {
		try {
			DB::beginTransaction();
			$product = ( new Product() )->storeProduct( $request->all(), auth()->id() );

			if ( $request->has( 'attributes' ) ) {
				( new ProductAttribute() )->storeProductAttribute( $request->input( 'attributes' ), $product );
			}
			if ( $request->has( 'specifications' ) ) {
				( new ProductSpecification() )->storeProductSpecification( $request->input( 'specifications' ), $product );
			}
			DB::commit();

			return response()->json( ['msg' => 'Product created successfully', 'cls' => 'success', 'product_id' => $product->id] );
		} catch ( Error $error ) {
			DB::rollBack();

			return response()->json( ['msg' => 'Unable to create product', 'cls' => 'error'] );
		}

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

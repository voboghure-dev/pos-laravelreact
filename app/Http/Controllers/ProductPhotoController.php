<?php
namespace App\Http\Controllers;

use App\Http\Requests\StoreProductPhotoRequest;
use App\Http\Requests\UpdateProductPhotoRequest;
use App\Manager\ImageManager;
use App\Models\Product;
use App\Models\ProductPhoto;
use Illuminate\Support\Str;

class ProductPhotoController extends Controller {
	/**
	 * Display a listing of the resource.
	 */
	public function index() {
		//
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
	public function store( StoreProductPhotoRequest $request ) {
		$product = ( new Product() )->getProductById( $request->productId );
		if ( $request->has( 'photos' ) ) {
			foreach ( $request->photos as $photo ) {
				$name                = Str::slug( $product->slug ) . '-' . time() . '-' . random_int( 10000, 99999 );
				$path                = ProductPhoto::IMAGE_UPLOAD_PATH;
				$path_thumb          = ProductPhoto::THUMB_UPLOAD_PATH;
				$photo_data['photo'] = ImageManager::imageUpload( $photo['photo'], $name, $path, $path_thumb );

				$photo_data['product_id'] = $request->productId;
				$photo_data['is_primary'] = $photo['is_primary'];

				( new ProductPhoto() )->storeProductPhoto( $photo_data );
			}
		}

		return response()->json( ['msg' => 'Photo uploaded successfully', 'cls' => 'success'] );
	}

	/**
	 * Display the specified resource.
	 */
	public function show( ProductPhoto $productPhoto ) {
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 */
	public function edit( ProductPhoto $productPhoto ) {
		//
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update( UpdateProductPhotoRequest $request, ProductPhoto $productPhoto ) {
		//
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy( ProductPhoto $productPhoto ) {
		//
	}
}

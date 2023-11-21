<?php
namespace App\Http\Controllers;

use App\Http\Requests\StoreSubCategoryRequest;
use App\Http\Requests\UpdateSubCategoryRequest;
use App\Manager\ImageManager;
use App\Models\SubCategory;
use Illuminate\Support\Str;

class SubCategoryController extends Controller {
	/**
	 * Display a listing of the resource.
	 */
	public function index() {
		//
	}

	/**
	 * Store a newly created resource in storage.
	 */
	public function store( StoreSubCategoryRequest $request ) {
		$sub_category            = $request->except( 'photo' );
		$sub_category['slug']    = Str::slug( $request->input( 'slug' ) );
		$sub_category['user_id'] = auth()->id();
		if ( $request->has( 'photo' ) ) {
			$sub_category['photo'] = $this->imageUpload( $request->input( 'photo' ), $sub_category['slug'] );
		}
		( new SubCategory() )->createSubCategory( $sub_category );

		return response()->json( ['msg' => 'Sub Category created successfully', 'cls' => 'success'] );
	}

	/**
	 * Display the specified resource.
	 */
	public function show( SubCategory $subCategory ) {
		//
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update( UpdateSubCategoryRequest $request, SubCategory $subCategory ) {
		//
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy( SubCategory $subCategory ) {
		//
	}

	/**
	 * Image upload process
	 *
	 * @param string $file
	 * @param string $name
	 * @param string|null $existing_image
	 * @return string
	 */
	private function imageUpload( string $file, string $name, string | null $existing_image = null ) {
		if (  ! empty( $existing_image ) ) {
			ImageManager::deleteImage( SubCategory::IMAGE_IMAGE_PATH, $existing_image );
			ImageManager::deleteImage( SubCategory::THUMB_IMAGE_IMAGE_PATH, $existing_image );
		}

		$width        = 800;
		$height       = 800;
		$width_thumb  = 150;
		$height_thumb = 150;
		$path         = SubCategory::IMAGE_IMAGE_PATH;
		$path_thumb   = SubCategory::THUMB_IMAGE_IMAGE_PATH;
		$photo_name   = ImageManager::uploadImage( $name, $width, $height, $path, $file );
		ImageManager::uploadImage( $name, $width_thumb, $height_thumb, $path_thumb, $file );

		return $photo_name;
	}
}

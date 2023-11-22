<?php
namespace App\Http\Controllers;

use App\Http\Requests\StoreBrandRequest;
use App\Http\Requests\UpdateBrandRequest;
use App\Http\Resources\BrandListResource;
use App\Manager\ImageManager;
use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BrandController extends Controller {
	/**
	 * Display a listing of the resource.
	 */
	public function index( Request $request ) {
		$brands = ( new Brand() )->getAllBrands( $request->all() );

		return BrandListResource::collection( $brands );
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param StoreBrandRequest $request
	 * @return void
	 */
	public function store( StoreBrandRequest $request ) {
		$brand            = $request->except( 'logo' );
		$brand['slug']    = Str::slug( $request->input( 'slug' ) );
		$brand['user_id'] = auth()->id();
		if ( $request->has( 'logo' ) ) {
			$brand['logo'] = $this->imageUpload( $request->input( 'logo' ), $brand['slug'] );
		}
		( new Brand() )->createBrand( $brand );

		return response()->json( ['msg' => 'Brand created successfully', 'cls' => 'success'] );
	}

	/**
	 * Display the specified resource.
	 */
	public function show( Brand $brand ) {
		//
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update( UpdateBrandRequest $request, Brand $brand ) {
		//
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy( Brand $brand ) {
		if (  ! empty( $brand->logo ) ) {
			ImageManager::deleteImage( Brand::IMAGE_IMAGE_PATH, $brand->logo );
			ImageManager::deleteImage( Brand::THUMB_IMAGE_IMAGE_PATH, $brand->logo );
		}
		$brand->delete();

		return response()->json( ['msg' => 'Brand deleted successfully', 'cls' => 'warning'] );
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
			ImageManager::deleteImage( Brand::IMAGE_IMAGE_PATH, $existing_image );
			ImageManager::deleteImage( Brand::THUMB_IMAGE_IMAGE_PATH, $existing_image );
		}

		$width        = 800;
		$height       = 800;
		$width_thumb  = 150;
		$height_thumb = 150;
		$path         = Brand::IMAGE_IMAGE_PATH;
		$path_thumb   = Brand::THUMB_IMAGE_IMAGE_PATH;
		$photo_name   = ImageManager::uploadImage( $name, $width, $height, $path, $file );
		ImageManager::uploadImage( $name, $width_thumb, $height_thumb, $path_thumb, $file );

		return $photo_name;
	}
}

<?php
namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Resources\CategoryEditResource;
use App\Http\Resources\CategoryListResource;
use App\Manager\ImageManager;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CategoryController extends Controller {
	/**
	 * Display a listing of the resource.
	 *
	 * @param Request $request
	 * @return void
	 */
	public function index( Request $request ) {
		$categories = ( new Category() )->getAllCategories( $request->all() );

		return CategoryListResource::collection( $categories );
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param StoreCategoryRequest $request
	 * @return JsonResponse
	 */
	public function store( StoreCategoryRequest $request ) {
		$category            = $request->except( 'photo' );
		$category['slug']    = Str::slug( $request->input( 'slug' ) );
		$category['user_id'] = auth()->id();
		if ( $request->has( 'photo' ) ) {
			$category['photo'] = $this->imageUpload( $request->input( 'photo' ), $category['slug'] );
		}
		( new Category() )->createCategory( $category );

		return response()->json( ['msg' => 'Category created successfully', 'cls' => 'success'] );
	}

	/**
	 * Display the specified resource.
	 *
	 * @param Category $category
	 * @return void
	 */
	public function show( Category $category ) {
		return new CategoryEditResource( $category );
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param UpdateCategoryRequest $request
	 * @param Category $category
	 * @return JsonResponse
	 */
	public function update( UpdateCategoryRequest $request, Category $category ) {
		$category_data            = $request->except( 'photo' );
		$category_data['slug']    = Str::slug( $request->input( 'slug' ) );
		$category_data['user_id'] = auth()->id();
		if (  ! empty( $request->photo ) ) {
			$category_data['photo'] = $this->imageUpload( $request->input( 'photo' ), $category_data['slug'], $category->photo );
		}
		$category->update( $category_data );

		return response()->json( ['msg' => 'Category updated successfully', 'cls' => 'success'] );
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param Category $category
	 * @return JsonResponse
	 */
	public function destroy( Category $category ) {
		if (  ! empty( $category->photo ) ) {
			ImageManager::deleteImage( Category::IMAGE_IMAGE_PATH, $category->photo );
			ImageManager::deleteImage( Category::THUMB_IMAGE_IMAGE_PATH, $category->photo );
		}
		$category->delete();

		return response()->json( ['msg' => 'Category deleted successfully', 'cls' => 'warning'] );
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
			ImageManager::deleteImage( Category::IMAGE_IMAGE_PATH, $existing_image );
			ImageManager::deleteImage( Category::THUMB_IMAGE_IMAGE_PATH, $existing_image );
		}

		$width        = 800;
		$height       = 800;
		$width_thumb  = 150;
		$height_thumb = 150;
		$path         = Category::IMAGE_IMAGE_PATH;
		$path_thumb   = Category::THUMB_IMAGE_IMAGE_PATH;
		$photo_name   = ImageManager::uploadImage( $name, $width, $height, $path, $file );
		ImageManager::uploadImage( $name, $width_thumb, $height_thumb, $path_thumb, $file );

		return $photo_name;
	}

	/**
	 * Get category list with id and name
	 *
	 * @return JsonResponse
	 */
	public function get_category_list() {
		$categories = ( new Category() )->getCategoryIdAndName();

		return response()->json( $categories );
	}
}

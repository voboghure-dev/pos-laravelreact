<?php
namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Resources\CategoryListResource;
use App\Manager\ImageManager;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CategoryController extends Controller {
	/**
	 * Display a listing of the resource.
	 */
	public function index( Request $request ) {
		$categories = ( new Category() )->getAllCategories( $request->all() );

		return CategoryListResource::collection( $categories );
	}

	/**
	 * Store a newly created resource in storage.
	 */
	public function store( StoreCategoryRequest $request ) {
		$category            = $request->except( 'photo' );
		$category['slug']    = Str::slug( $request->input( 'slug' ) );
		$category['user_id'] = auth()->id();
		if ( $request->has( 'photo' ) ) {
			$file              = $request->input( 'photo' );
			$width             = 800;
			$height            = 800;
			$width_thumb       = 150;
			$height_thumb      = 150;
			$name              = Str::slug( $request->input( 'slug' ) );
			$path              = Category::IMAGE_IMAGE_PATH;
			$path_thumb        = Category::THUMB_IMAGE_IMAGE_PATH;
			$category['photo'] = ImageManager::uploadImage( $name, $width, $height, $path, $file );
			ImageManager::uploadImage( $name, $width_thumb, $height_thumb, $path_thumb, $file );
		}
		( new Category() )->storeCategory( $category );

		return response()->json( ['msg' => 'Category created successfully', 'cls' => 'success'] );
	}

	/**
	 * Display the specified resource.
	 */
	public function show( Category $category ) {
		//
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update( UpdateCategoryRequest $request, Category $category ) {
		//
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy( Category $category ) {
		//
	}
}

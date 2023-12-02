<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubCategory extends Model {
	use HasFactory;

	public const IMAGE_IMAGE_PATH       = 'images/uploads/sub_category/';
	public const THUMB_IMAGE_IMAGE_PATH = 'images/uploads/sub_category_thumb/';

	protected $fillable = [
		'name',
		'category_id',
		'slug',
		'serial',
		'status',
		'description',
		'photo',
		'user_id',
	];

	/**
	 * Create sub category data
	 *
	 * @param array $input
	 * @return void
	 */
	public function createSubCategory( array $input ) {
		return self::query()->create( $input );
	}

	/**
	 * Get all sub category data
	 *
	 * @param array $input
	 * @return void
	 */
	final public function getAllSubCategories( array $input ) {
		$query = self::query();
		if ( $input['search'] ) {
			$query->where( 'name', 'LIKE', '%' . $input['search'] . '%' );
		}
		if ( $input['order_by'] ) {
			$query->orderBy( $input['order_by'], $input['direction'] ?? 'asc' );
		}
		$per_page = $input['per_page'] ?? 10;

		return $query->with( ['user:id,name', 'category:id,name'] )->paginate( $per_page );
	}

	/**
	 * Get sub category id and name for populate select sub category dropdown
	 *
	 * @return collection
	 */
	public function getCategoryIdAndName( $category_id ) {
		return self::query()->select( 'id', 'name' )->where( 'category_id', $category_id )->get();
	}

	/**
	 * Relation with user table
	 *
	 * @return void
	 */
	public function user() {
		return $this->belongsTo( User::class );
	}

	/**
	 * Relation with category table
	 *
	 * @return void
	 */
	public function category() {
		return $this->belongsTo( Category::class );
	}
}

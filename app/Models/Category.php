<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model {
	use HasFactory;

	public const IMAGE_IMAGE_PATH       = 'images/uploads/category/';
	public const THUMB_IMAGE_IMAGE_PATH = 'images/uploads/category_thumb/';

	protected $fillable = [
		'name',
		'slug',
		'serial',
		'status',
		'description',
		'photo',
		'user_id',
	];

	/**
	 * Create category data
	 *
	 * @param array $input
	 * @return void
	 */
	public function createCategory( array $input ) {
		return self::query()->create( $input );
	}

	/**
	 * Update category data
	 *
	 * @param array $input
	 * @return void
	 */
	public function updateCategory( array $input ) {
		return self::query()->update( $input );
	}

	/**
	 * Get all category data
	 *
	 * @param array $input
	 * @return void
	 */
	final public function getAllCategories( array $input ) {
		$query = self::query();
		if ( $input['search'] ) {
			$query->where( 'name', 'LIKE', '%' . $input['search'] . '%' );
		}
		if ( $input['order_by'] ) {
			$query->orderBy( $input['order_by'], $input['direction'] ?? 'asc' );
		}
		$per_page = $input['per_page'] ?? 10;

		return $query->with( 'user:id,name' )->paginate( $per_page );
	}

	/**
	 * Get category id and name for populate select category dropdown
	 *
	 * @return collection
	 */
	public function getCategoryIdAndName() {
		return self::query()->select( 'id', 'name' )->get();
	}

	/**
	 * Relation with user table
	 *
	 * @return void
	 */
	public function user() {
		return $this->belongsTo( User::class );
	}
}

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
	 * Create category data
	 *
	 * @param array $input
	 * @return void
	 */
	public function createSubCategory( array $input ) {
		return self::query()->create( $input );
	}
}

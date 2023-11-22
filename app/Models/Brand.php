<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Brand extends Model {
	use HasFactory;

	public const IMAGE_IMAGE_PATH       = 'images/uploads/logo/';
	public const THUMB_IMAGE_IMAGE_PATH = 'images/uploads/logo_thumb/';

	protected $fillable = [
		'name',
		'slug',
		'serial',
		'status',
		'description',
		'logo',
		'user_id',
	];

	/**
	 * Create brand data
	 *
	 * @param array $input
	 * @return void
	 */
	public function createBrand( array $input ) {
		return self::query()->create( $input );
	}
}

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

	/**
	 * Get all brand data
	 *
	 * @param array $input
	 * @return void
	 */
	final public function getAllBrands( array $input ) {
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
	 * Get brand id and name list
	 *
	 * @return void
	 */
	public function getBrandIdAndName() {
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

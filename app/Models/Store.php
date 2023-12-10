<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class Store extends Model {
	use HasFactory;

	protected $fillable = [
		'name',
		'phone',
		'email',
		'status',
		'description',
		'logo',
		'user_id',
	];

	public const IMAGE_UPLOAD_PATH       = 'images/uploads/store/';
	public const THUMB_IMAGE_UPLOAD_PATH = 'images/uploads/store_thumb/';

	/**
	 * Prepare store data
	 *
	 * @param array $input
	 * @param object $auth
	 * @return array
	 */
	final public function prepareData( array $input, $auth ): array {
		$store['name']        = $input['name'] ?? '';
		$store['phone']       = $input['phone'] ?? '';
		$store['email']       = $input['email'] ?? '';
		$store['status']      = $input['status'] ?? 0;
		$store['description'] = $input['description'] ?? '';
		$store['user_id']     = $auth->id();

		return $store;
	}

	/**
	 * Get all store's data
	 *
	 * @param array $input
	 * @return void
	 */
	final public function getAllStores( array $input ) {
		$query = self::query();
		if ( $input['search'] ) {
			$query->where( 'name', 'LIKE', '%' . $input['search'] . '%' )
				->orWhere( 'phone', 'LIKE', '%' . $input['search'] . '%' )
				->orWhere( 'email', 'LIKE', '%' . $input['search'] . '%' );
		}
		if ( $input['order_by'] ) {
			$query->orderBy( $input['order_by'], $input['direction'] ?? 'asc' );
		}
		$per_page = $input['per_page'] ?? 10;

		return $query->with( ['user:id,name', 'address'] )->paginate( $per_page );
	}

	final public function getStoreIdAndName() {
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

	/**
	 * Save address with morph relation
	 *
	 * @return MorphOne
	 */
	final public function address(): MorphOne {
		return $this->morphOne( Address::class, 'addressable' );
	}
}

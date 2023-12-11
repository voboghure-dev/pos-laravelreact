<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Support\Facades\Hash;

class SalesManager extends Model {
	use HasFactory;

	public const PHOTO_UPLOAD_PATH         = 'images/uploads/manager/';
	public const PHOTO_THUMB_UPLOAD_PATH   = 'images/uploads/manager_thumb/';
	public const GOVT_ID_UPLOAD_PATH       = 'images/uploads/govt_id/';
	public const GOVT_ID_THUMB_UPLOAD_PATH = 'images/uploads/govt_id_thumb/';

	protected $fillable = [
		'user_id',
		'store_id',
		'name',
		'phone',
		'email',
		'password',
		'govt_id_number',
		'status',
		'bio',
		'photo',
		'govt_id_photo',
	];

	final public function prepareData( array $input, $auth ): array {
		$manager['name']           = $input['name'] ?? '';
		$manager['phone']          = $input['phone'] ?? '';
		$manager['email']          = $input['email'] ?? '';
		$manager['password']       = Hash::make( $input['password'] );
		$manager['govt_id_number'] = $input['govt_id_number'] ?? '';
		$manager['status']         = $input['status'] ?? 0;
		$manager['bio']            = $input['bio'] ?? '';
		$manager['user_id']        = $auth->id();
		$manager['store_id']       = $input['store_id'] ?? 0;

		return $manager;
	}

	final public function getAllSalesManagers( array $input ) {
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

	/**
	 * Relation with user
	 *
	 * @return BelongsTo
	 */
	final public function user(): BelongsTo {
		return $this->belongsTo( User::class );
	}

	/**
	 * Relation with address
	 *
	 * @return MorphOne
	 */
	final public function address(): MorphOne {
		return $this->morphOne( Address::class, 'addressable' );
	}
}

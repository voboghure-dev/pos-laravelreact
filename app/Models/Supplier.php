<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class Supplier extends Model {
	use HasFactory;

	public const IMAGE_IMAGE_PATH       = 'images/uploads/supplier/';
	public const THUMB_IMAGE_IMAGE_PATH = 'images/uploads/supplier_thumb/';

	protected $fillable = [
		'company_name',
		'phone_number',
		'email_address',
		'status',
		'description',
		'logo',
		'user_id',
	];

	/**
	 * Prepare data for supplier
	 *
	 * @param array $input
	 * @param object $auth
	 * @return array
	 */
	final public function prepareData( array $input, $auth ): array {
		$supplier['company_name']  = $input['company_name'] ?? '';
		$supplier['phone_number']  = $input['phone_number'] ?? '';
		$supplier['email_address'] = $input['email_address'] ?? '';
		$supplier['status']        = $input['status'] ?? '';
		$supplier['description']   = $input['description'] ?? '';
		$supplier['user_id']       = $auth->id();

		return $supplier;
	}

	/**
	 * Get all suppliers data
	 *
	 * @param array $input
	 * @return void
	 */
	final public function getAllSuppliers( array $input ) {
		$query = self::query();
		if ( $input['search'] ) {
			$query->where( 'company_name', 'LIKE', '%' . $input['search'] . '%' )
				->orWhere( 'phone_number', 'LIKE', '%' . $input['search'] . '%' )
				->orWhere( 'email_address', 'LIKE', '%' . $input['search'] . '%' );
		}
		if ( $input['order_by'] ) {
			$query->orderBy( $input['order_by'], $input['direction'] ?? 'asc' );
		}
		$per_page = $input['per_page'] ?? 10;

		return $query->with( ['user:id,name', 'address'] )->paginate( $per_page );
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
	 * Get the supplier's address.
	 */
	public function address(): MorphOne {
		return $this->morphOne( Address::class, 'addressable' );
	}
}

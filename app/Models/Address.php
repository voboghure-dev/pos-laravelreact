<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Address extends Model {
	use HasFactory;

	protected $fillable = [
		'address',
		'division',
		'district',
		'area',
		'land_mark',
		'status',
		'type',
		'addressable_type',
		'addressable_id',
	];

	/**
	 * Prepare data for address
	 *
	 * @param array $input
	 * @return array
	 */
	final public function prepareData( array $input ): array {
		$address['address']   = $input['address'] ?? '';
		$address['division']  = $input['division'] ?? '';
		$address['district']  = $input['district'] ?? '';
		$address['area']      = $input['area'] ?? '';
		$address['land_mark'] = $input['land_mark'] ?? '';
		$address['status']    = 1;
		$address['type']      = 1;

		return $address;
	}

	/**
	 * Delete supplier address
	 *
	 * @param object $supplier
	 * @return void
	 */
	final public function deleteBySupplier( $supplier ) {
		return $supplier->address()->delete();
	}

	/**
	 * Delete store address
	 *
	 * @param object $store
	 * @return void
	 */
	final public function deleteByStore( $store ) {
		return $store->address()->delete();
	}

	/**
	 * Get the parent addressable model
	 *
	 * @return MorphTo
	 */
	public function addressable(): MorphTo {
		return $this->morphTo();
	}
}

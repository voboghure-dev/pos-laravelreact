<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class Supplier extends Model {
	use HasFactory;

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
	 * @param [type] $auth
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
	 * Get the supplier's address.
	 */
	public function address(): MorphOne {
		return $this->morphOne( Address::class, 'addressable' );
	}
}

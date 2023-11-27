<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attribute extends Model {
	use HasFactory;

	protected $fillable = [
		'user_id',
		'name',
		'status',
	];

	/**
	 * Prepare data for attribute
	 *
	 * @param array $input
	 * @param object $auth
	 * @return array
	 */
	final public function prepareData( array $input, $auth ): array {
		$attribute['name']    = $input['name'] ?? '';
		$attribute['status']  = $input['status'] ?? '';
		$attribute['user_id'] = $auth->id();

		return $attribute;
	}
}

<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductAttribute extends Model {
	use HasFactory;

	/**
	 * Prepare attributre data
	 *
	 * @param array $input
	 * @return array
	 */
	public function prepareData( array $input ): array {
		$attribute_data = [];
		foreach ( $input as $value ) {
			$data['attribute_id']       = $value['attribute_id'];
			$data['attribute_value_id'] = $value['value_id'];
			$attribute_data[]           = $data;
		}

		return $attribute_data;
	}
}

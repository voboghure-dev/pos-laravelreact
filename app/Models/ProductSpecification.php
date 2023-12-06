<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductSpecification extends Model {
	use HasFactory;

	/**
	 * Prepare specification data
	 *
	 * @param array $input
	 * @return array
	 */
	public function prepareData( array $input ): array {
		$specification_data = [];
		foreach ( $input as $value ) {
			$data['name']         = $value['spec_name'];
			$data['value']        = $value['spec_value'];
			$specification_data[] = $data;
		}

		return $specification_data;
	}
}

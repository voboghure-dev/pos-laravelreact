<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductSpecification extends Model {
	use HasFactory;

    protected $guarded = [];
	/**
	 * Store product specification data
	 *
	 * @param array $specifications
	 * @param Product $product
	 * @return void
	 */
	public function storeProductSpecification( array $specifications, Product $product ): void {
		$specifications_data = $this->prepareData( $specifications, $product );
		foreach ( $specifications_data as $specification ) {
			self::create( $specification );
		}
	}

	/**
	 * Prepare specification data
	 *
	 * @param array $input
	 * @param Product $product
	 * @return array
	 */
	private function prepareData( array $specifications, Product $product ): array {
		$specification_data = [];
		foreach ( $specifications as $value ) {
			$data['product_id']   = $product->id;
			$data['name']         = $value['spec_name'];
			$data['value']        = $value['spec_value'];
			$specification_data[] = $data;
		}

		return $specification_data;
	}
}

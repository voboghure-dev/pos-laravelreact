<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductAttribute extends Model {
	use HasFactory;

	protected $fillable = [
		'product_id',
		'attribute_id',
		'attribute_value_id',
	];
	/**
	 * Store product attributes
	 *
	 * @param array $attributes
	 * @param Product $product
	 * @return void
	 */
	public function storeProductAttribute( array $attributes, Product $product ): void {
		$attributes = $this->prepareData( $attributes, $product );
		foreach ( $attributes as $attribute ) {
			self::create( $attribute );
		}
	}

	/**
	 * Prepare attributre data
	 *
	 * @param array $attributes
	 * @param Product $product
	 * @return array
	 */
	private function prepareData( array $attributes, Product $product ): array {
		$attribute_data = [];
		foreach ( $attributes as $value ) {
			$data['product_id']         = $product->id;
			$data['attribute_id']       = $value['attribute_id'];
			$data['attribute_value_id'] = $value['value_id'];
			$attribute_data[]           = $data;
		}

		return $attribute_data;
	}

	public function attribute() {
		return $this->belongsTo( Attribute::class, 'attribute_id' );
	}

	public function attribute_value() {
		return $this->belongsTo( AttributeValue::class, 'attribute_value_id' );
	}
}

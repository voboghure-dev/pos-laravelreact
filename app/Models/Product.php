<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model {
	use HasFactory;

	protected $guarded = [];
	/**
	 * Store product data
	 *
	 * @param array $input
	 * @param integer $auth_id
	 * @return mixed
	 */
	public function storeProduct( array $input, int $auth_id ): mixed {
		return self::create( $this->prepareData( $input, $auth_id ) );
	}

	/**
	 * Prepare product data
	 *
	 * @param array $input
	 * @param integer $auth_id
	 * @return array
	 */
	private function prepareData( array $input, int $auth_id ): array {
		return [
			'category_id'      => $input['category_id'] ?? '',
			'sub_category_id'  => $input['sub_category_id'] ?? '',
			'brand_id'         => $input['brand_id'] ?? '',
			'country_id'       => $input['country_id'] ?? '',
			'supplier_id'      => $input['supplier_id'] ?? '',
			'created_by'       => $auth_id ?? '',
			'updated_by'       => $auth_id ?? '',
			'name'             => $input['name'] ?? '',
			'slug'             => $input['slug'] ?? '',
			'status'           => $input['status'] ?? '',
			'sku'              => $input['sku'] ?? '',
			'stock'            => $input['stock'] ?? '',
			'cost'             => $input['cost'] ?? '',
			'price'            => $input['price'] ?? '',
			'discount_percent' => $input['discount_percent'] ?? '',
			'discount_fixed'   => $input['discount_fixed'] ?? '',
			'discount_start'   => $input['discount_start'] ?? '',
			'discount_end'     => $input['discount_end'] ?? '',
			'description'      => $input['description'] ?? '',
		];
	}
}

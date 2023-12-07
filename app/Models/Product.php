<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Product extends Model {
	use HasFactory;

	protected $fillable = [
		'category_id',
		'sub_category_id',
		'brand_id',
		'country_id',
		'supplier_id',
		'created_by',
		'updated_by',
		'name',
		'slug',
		'status',
		'sku',
		'stock',
		'cost',
		'price',
		'discount_percent',
		'discount_fixed',
		'discount_start',
		'discount_end',
		'description',
	];

	/**
	 * Get product by id
	 *
	 * @param integer $id
	 * @return Model | null
	 */
	public function getProductById( int $id ): Model | null {
		return self::query()->findOrFail( $id );
	}

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
			'category_id'      => $input['category_id'] ?? 0,
			'sub_category_id'  => $input['sub_category_id'] ?? 0,
			'brand_id'         => $input['brand_id'] ?? 0,
			'country_id'       => $input['country_id'] ?? 0,
			'supplier_id'      => $input['supplier_id'] ?? 0,
			'created_by'       => $auth_id ?? 0,
			'updated_by'       => $auth_id ?? 0,
			'name'             => $input['name'] ?? '',
			'slug'             => $input['slug'] ? Str::slug( $input['slug'] ) : '',
			'status'           => $input['status'] ?? 0,
			'sku'              => $input['sku'] ?? '',
			'stock'            => $input['stock'] ?? 0,
			'cost'             => $input['cost'] ?? 0,
			'price'            => $input['price'] ?? 0,
			'discount_percent' => $input['discount_percent'] ?? 0,
			'discount_fixed'   => $input['discount_fixed'] ?? 0,
			'discount_start'   => $input['discount_start'] ?? null,
			'discount_end'     => $input['discount_end'] ?? null,
			'description'      => $input['description'] ?? '',
		];
	}
}

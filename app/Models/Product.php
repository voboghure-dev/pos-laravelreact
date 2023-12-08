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

	public function getAllProducts( array $input ) {
		$per_page = $input['per_page'] ?? 10;
		$query    = self::query()->with( [
			'category:id,name',
			'sub_category:id,name',
			'brand:id,name',
			'country:id,name',
			'supplier:id,company_name,phone_number',
			'created_user:id,name',
			'updated_user:id,name',
			'primary_photo',
			'product_attributes',
			'product_attributes.attribute:id,name',
			'product_attributes.attribute_value:id,name',
		] );
		if (  ! empty( $input['search'] ) ) {
			$query->where( 'name', 'LIKE', '%' . $input['search'] . '%' )
				->orWhere( 'sku', 'LIKE', '%' . $input['search'] . '%' );
		}
		if (  ! empty( $input['order_by'] ) ) {
			$query->orderBy( $input['order_by'], $input['direction'] ?? 'asc' );
		}

		return $query->paginate( $per_page );
	}

	public function category() {
		return $this->belongsTo( Category::class );
	}

	public function sub_category() {
		return $this->belongsTo( SubCategory::class, 'sub_category_id' );
	}

	public function brand() {
		return $this->belongsTo( Brand::class, 'brand_id' );
	}

	public function country() {
		return $this->belongsTo( Country::class, 'country_id' );
	}

	public function supplier() {
		return $this->belongsTo( Supplier::class, 'supplier_id' );
	}

	public function created_user() {
		return $this->belongsTo( User::class, 'created_by' );
	}

	public function updated_user() {
		return $this->belongsTo( User::class, 'updated_by' );
	}

	public function primary_photo() {
		return $this->hasOne( ProductPhoto::class )->where( 'is_primary', 1 );
	}

	public function product_attributes() {
		return $this->hasMany( ProductAttribute::class );
	}
}

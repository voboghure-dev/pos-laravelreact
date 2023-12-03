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

	/**
	 * Get all attribute data
	 *
	 * @param array $input
	 * @return void
	 */
	final public function getAllAttributes( array $input ) {
		$query = self::query();
		if ( $input['search'] ) {
			$query->where( 'name', 'LIKE', '%' . $input['search'] . '%' );
		}
		if ( $input['order_by'] ) {
			$query->orderBy( $input['order_by'], $input['direction'] ?? 'asc' );
		}
		$per_page = $input['per_page'] ?? 10;

		return $query->with( ['user:id,name', 'value', 'value.user:id,name'] )->paginate( $per_page );
	}

	/**
	 * Get attribute list with value
	 *
	 * @return collection
	 */
	final public function getAttributeListWithValue() {
		return self::query()->select( 'id', 'name' )->with( 'value:id,name,attribute_id' )->get();
	}

	/**
	 * Relation with user table
	 *
	 * @return void
	 */
	public function user() {
		return $this->belongsTo( User::class );
	}

	/**
	 * Relation with attribute_values table
	 *
	 * @return void
	 */
	public function value() {
		return $this->hasMany( AttributeValue::class );
	}
}

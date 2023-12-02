<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Country extends Model {
	use HasFactory;

	protected $guarded = [];

	/**
	 * Get country id and name list
	 *
	 * @return void
	 */
	public function getCountryIdAndName() {
		return self::query()->select( 'id', 'name' )->get();
	}
}

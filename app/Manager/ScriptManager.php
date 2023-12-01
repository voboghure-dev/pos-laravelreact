<?php
namespace App\Manager;

use App\Models\Country;
use Illuminate\Support\Facades\File;

class ScriptManager {
	public function getCountry() {
		$json = File::json( 'countries.json' );
		foreach ( $json as $value ) {
			$country_data['name'] = $value['Name'];
			$country_data['code'] = $value['Code'];
			Country::create( $country_data );
			// dd( $country_data );
		}
	}
}
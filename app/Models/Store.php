<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Store extends Model {
	use HasFactory;

	public const IMAGE_UPLOAD_PATH       = '';
	public const THUMB_IMAGE_UPLOAD_PATH = '';

	public function prepareData( array $input, $auth ) {
		$store['name']        = $input['name'] ?? '';
		$store['phone']       = $input['phone'] ?? '';
		$store['email']       = $input['email'] ?? '';
		$store['status']      = $input['status'] == 1 ? 'Active' : 'Inactive';
		$store['description'] = $input['description'] ?? '';
		$store['user_id']     = $auth->id();

		return $store;
	}
}

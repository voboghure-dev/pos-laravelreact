<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductPhoto extends Model {
	use HasFactory;

	protected $fillable = [
		'product_id',
		'photo',
		'is_primary',
	];

	public const IMAGE_UPLOAD_PATH = 'images/uploads/product/';
	public const THUMB_UPLOAD_PATH = 'images/uploads/product_thumb/';

	public function storeProductPhoto( array $photo ) {
		return self::create( $photo );
	}
}

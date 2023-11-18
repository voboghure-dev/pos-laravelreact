<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model {
	use HasFactory;

	public const IMAGE_IMAGE_PATH       = 'images/uploads/category/';
	public const THUMB_IMAGE_IMAGE_PATH = 'images/uploads/category_thumb/';

	protected $fillable = [
		'name',
		'slug',
		'serial',
		'status',
		'description',
		'photo',
		'user_id',
	];

	public function storeCategory( array $input ) {
		return self::query()->create( $input );
	}

	final public function getAllCategories() {
		return self::query()->with( 'user:id,name' )->orderBy( 'serial' )->paginate(2);
	}

	public function user() {
		return $this->belongsTo( User::class );
	}
}

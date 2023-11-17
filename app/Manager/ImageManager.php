<?php
namespace App\Manager;

use Intervention\Image\Facades\Image;

class ImageManager {
	public const DEFAULT_IMAGE = 'images/default.webp';

	final public static function uploadImage( string $name, int $width, int $height, string $path, string $file ) {
		$image_file_name = $name . ".webp";
		$img             = Image::make( $file );
		$img->resize( $width, $height, function ( $constraint ) {
			$constraint->aspectRatio();
			$constraint->upsize();
		} );
		$img->save( public_path( $path ) . $image_file_name, '50', 'webp' );

		return $image_file_name;
	}

	final public static function deleteImage( string $path, string $img ) {
		$path = public_path( $path ) . $img;
		if ( $img != "" && file_exists( $path ) ) {
			unlink( $path );
		}
	}

	final public static function prepareImage( string $path, string | null $image ) {
		$url = url( $path . $image );
		if ( empty( $image ) ) {
			$url = url( self::DEFAULT_IMAGE );
		}

		return $url;
	}
}

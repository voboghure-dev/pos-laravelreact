<?php
namespace App\Manager;

use Intervention\Image\Facades\Image;

class ImageManager {
	public const DEFAULT_IMAGE = 'images/default.webp';

	/**
	 * Upload image
	 *
	 * @param string $name
	 * @param integer $width
	 * @param integer $height
	 * @param string $path
	 * @param string $file
	 * @return string
	 */
	final public static function uploadImage( string $name, int $width, int $height, string $path, string $file ): string {
		$image_file_name = $name . ".webp";
		$img             = Image::make( $file );
		$img->resize( $width, $height, function ( $constraint ) {
			$constraint->aspectRatio();
			$constraint->upsize();
		} );
		$img->save( public_path( $path ) . $image_file_name, '50', 'webp' );

		return $image_file_name;
	}

	/**
	 * Delete image
	 *
	 * @param string $path
	 * @param string $img
	 * @return void
	 */
	final public static function deleteImage( string $path, string $img ): void {
		$path = public_path( $path ) . $img;
		if ( $img != "" && file_exists( $path ) ) {
			unlink( $path );
		}
	}

	final public static function prepareImage( string $path, string | null $image ): string {
		$url = url( $path . $image );
		if ( empty( $image ) ) {
			$url = url( self::DEFAULT_IMAGE );
		}

		return $url;
	}

	final public static function imageUpload( string $file, string $name, string $path, string $path_thumb, string | null $existing_image = null ): string {
		$width        = 800;
		$height       = 800;
		$width_thumb  = 150;
		$height_thumb = 150;

		if (  ! empty( $existing_image ) ) {
			self::deleteImage( $path, $existing_image );
			self::deleteImage( $path_thumb, $existing_image );
		}

		$image_name = self::uploadImage( $name, $width, $height, $path, $file );
		self::uploadImage( $name, $width_thumb, $height_thumb, $path_thumb, $file );

		return $image_name;
	}
}

<?php
namespace App\Http\Resources;

use App\Manager\ImageManager;
use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BrandListResource extends JsonResource {
	/**
	 * Transform the resource into an array.
	 *
	 * @return array<string, mixed>
	 */
	public function toArray( Request $request ): array {
		return [
			'id'          => $this->id,
			'name'        => $this->name,
			'description' => $this->description,
			'slug'        => $this->slug,
			'serial'      => $this->serial,
			'status'      => $this->status == 1 ? 'Active' : 'Inactive',
			'logo'        => ImageManager::prepareImage( Brand::IMAGE_IMAGE_PATH, $this->logo ),
			'logo_thumb'  => ImageManager::prepareImage( Brand::THUMB_IMAGE_IMAGE_PATH, $this->logo ),
			'created_by'  => $this->user?->name,
			'created_at'  => $this->created_at->toDayDateTimeString(),
			'updated_at'  => $this->created_at != $this->updated_at ? $this->updated_at->toDayDateTimeString() : 'Not yet updated',
		];
	}
}

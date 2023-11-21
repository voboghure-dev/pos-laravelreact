<?php
namespace App\Http\Resources;

use App\Manager\ImageManager;
use App\Models\SubCategory;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SubCategoryListResource extends JsonResource {
	/**
	 * Transform the resource into an array.
	 *
	 * @return array<string, mixed>
	 */
	public function toArray( Request $request ): array {
		return [
			'id'          => $this->id,
			'category'    => $this->category?->name,
			'name'        => $this->name,
			'description' => $this->description,
			'slug'        => $this->slug,
			'serial'      => $this->serial,
			'status'      => $this->serial == 1 ? 'Active' : 'Inactive',
			'photo'       => ImageManager::prepareImage( SubCategory::IMAGE_IMAGE_PATH, $this->photo ),
			'photo_thumb' => ImageManager::prepareImage( SubCategory::THUMB_IMAGE_IMAGE_PATH, $this->photo ),
			'created_by'  => $this->user?->name,
			'created_at'  => $this->created_at->toDayDateTimeString(),
			'updated_at'  => $this->created_at != $this->updated_at ? $this->updated_at->toDayDateTimeString() : 'Not yet updated',
		];
	}
}

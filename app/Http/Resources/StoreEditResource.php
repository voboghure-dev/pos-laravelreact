<?php
namespace App\Http\Resources;

use App\Manager\ImageManager;
use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StoreEditResource extends JsonResource {
	/**
	 * Transform the resource into an array.
	 *
	 * @return array<string, mixed>
	 */
	public function toArray( Request $request ): array {
		return [
			'id'            => $this->id,
			'name'          => $this->name,
			'phone'         => $this->phone,
			'email'         => $this->email,
			'description'   => $this->description,
			'status'        => $this->status,
			'existing_logo' => ImageManager::prepareImage( Store::THUMB_IMAGE_UPLOAD_PATH, $this->logo ),
			'address'       => $this->address?->address,
			'division'      => $this->address?->division,
			'district'      => $this->address?->district,
			'area'          => $this->address?->area,
			'land_mark'     => $this->address?->land_mark,
		];
	}
}

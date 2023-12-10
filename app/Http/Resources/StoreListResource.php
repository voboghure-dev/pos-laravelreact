<?php
namespace App\Http\Resources;

use App\Manager\ImageManager;
use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StoreListResource extends JsonResource {
	/**
	 * Transform the resource into an array.
	 *
	 * @return array<string, mixed>
	 */
	public function toArray( Request $request ): array {
		return [
			'id'          => $this->id,
			'name'        => $this->name,
			'phone'       => $this->phone,
			'email'       => $this->email,
			'description' => $this->description,
			'status'      => $this->status == 1 ? 'Active' : 'Inactive',
			'logo'        => ImageManager::prepareImage( Store::IMAGE_UPLOAD_PATH, $this->logo ),
			'logo_thumb'  => ImageManager::prepareImage( Store::THUMB_IMAGE_UPLOAD_PATH, $this->logo ),
			'created_by'  => $this->user?->name,
			'created_at'  => $this->created_at->toDayDateTimeString(),
			'updated_at'  => $this->created_at != $this->updated_at ? $this->updated_at->toDayDateTimeString() : 'Not yet updated',
			'address'     => new AddressListResource( $this->address ),
		];
	}
}

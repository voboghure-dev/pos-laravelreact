<?php
namespace App\Http\Resources;

use App\Manager\ImageManager;
use App\Models\SalesManager;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SalesManagerListResource extends JsonResource {
	/**
	 * Transform the resource into an array.
	 *
	 * @return array<string, mixed>
	 */
	public function toArray( Request $request ): array {
		return [
			'id'             => $this->id,
			'name'           => $this->name,
			'store'          => $this->store?->name,
			'phone'          => $this->phone,
			'email'          => $this->email,
			'govt_id_number' => $this->govt_id_number,
			'bio'            => $this->bio,
			'status'         => $this->status == 1 ? 'Active' : 'Inactive',
			'photo'          => ImageManager::prepareImage( SalesManager::PHOTO_UPLOAD_PATH, $this->photo ),
			'photo_thumb'    => ImageManager::prepareImage( SalesManager::PHOTO_THUMB_UPLOAD_PATH, $this->photo ),
			'govt_id'        => ImageManager::prepareImage( SalesManager::GOVT_ID_UPLOAD_PATH, $this->govt_id_photo ),
			'govt_id_thumb'  => ImageManager::prepareImage( SalesManager::GOVT_ID_THUMB_UPLOAD_PATH, $this->govt_id_photo ),
			'created_by'     => $this->user?->name,
			'created_at'     => $this->created_at->toDayDateTimeString(),
			'updated_at'     => $this->created_at != $this->updated_at ? $this->updated_at->toDayDateTimeString() : 'Not yet updated',
			'address'        => new AddressListResource( $this->address ),
		];
	}
}

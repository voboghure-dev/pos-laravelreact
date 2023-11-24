<?php
namespace App\Http\Resources;

use App\Manager\ImageManager;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SupplierListResource extends JsonResource {
	/**
	 * Transform the resource into an array.
	 *
	 * @return array<string, mixed>
	 */
	public function toArray( Request $request ): array {
		return [
			'id'            => $this->id,
			'company_name'  => $this->company_name,
			'phone_number'  => $this->phone_number,
			'email_address' => $this->email_address,
			'description'   => $this->description,
			'status'        => $this->status == 1 ? 'Active' : 'Inactive',
			'logo'          => ImageManager::prepareImage( Supplier::IMAGE_IMAGE_PATH, $this->logo ),
			'logo_thumb'    => ImageManager::prepareImage( Supplier::THUMB_IMAGE_IMAGE_PATH, $this->logo ),
			'created_by'    => $this->user?->name,
			'created_at'    => $this->created_at->toDayDateTimeString(),
			'updated_at'    => $this->created_at != $this->updated_at ? $this->updated_at->toDayDateTimeString() : 'Not yet updated',
			'address'       => new AddressListResource( $this->address ),
		];
	}
}

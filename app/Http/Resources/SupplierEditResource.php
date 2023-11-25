<?php
namespace App\Http\Resources;

use App\Manager\ImageManager;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SupplierEditResource extends JsonResource {
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
			'status'        => $this->status,
			'existing_logo' => ImageManager::prepareImage( Supplier::THUMB_IMAGE_IMAGE_PATH, $this->logo ),
			'address'       => $this->address?->address,
			'division'      => $this->address?->division,
			'district'      => $this->address?->district,
			'area'          => $this->address?->area,
			'land_mark'     => $this->address?->land_mark,

		];
	}
}

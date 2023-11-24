<?php
namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AddressListResource extends JsonResource {
	/**
	 * Transform the resource into an array.
	 *
	 * @return array<string, mixed>
	 */
	public function toArray( Request $request ): array {
		return [
			'id'        => $this->id,
			'address'   => $this->address,
			'division'  => $this->division,
			'district'  => $this->district,
			'area'      => $this->area,
			'land_mark' => $this->land_mark,
		];
	}
}

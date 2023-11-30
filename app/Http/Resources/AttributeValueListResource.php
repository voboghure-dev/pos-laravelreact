<?php
namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AttributeValueListResource extends JsonResource {
	/**
	 * Transform the resource into an array.
	 *
	 * @return array<string, mixed>
	 */
	public function toArray( Request $request ): array {
		return [
			'id'              => $this->id,
			'name'            => $this->name,
			'status'          => $this->status != 0 ? 'Active' : 'Inactive',
			'original_status' => $this->status,
			'created_by'      => $this->user?->name,
		];
	}
}

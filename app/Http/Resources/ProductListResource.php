<?php
namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductListResource extends JsonResource {
	/**
	 * Transform the resource into an array.
	 *
	 * @return array<string, mixed>
	 */
	public function toArray( Request $request ): array {
		return [
			'id'               => $this->id,
			'category'         => $this->category?->name,
			'sub_category'     => $this->sub_category?->name,
			'brand'            => $this->brand?->name,
			'country'          => $this->country?->name,
			'supplier'         => $this->supplier?->company_name,
			'created_by_user'  => $this->created_user?->name,
			'updated_by_user'  => $this->updated_user?->name,
			'name'             => $this->name,
			'slug'             => $this->slug,
			'status'           => $this->status == 1 ? 'Active' : 'Inactive',
			'sku'              => $this->sku,
			'stock'            => $this->stock,
			'cost'             => $this->cost,
			'price'            => $this->price,
			'discount_percent' => $this->discount_percent,
			'discount_fixed'   => $this->discount_fixed,
			'discount_start'   => $this->discount_start ? Carbon::create( $this->discount_start )->toDayDateTimeString() : null,
			'discount_end'     => $this->discount_end ? Carbon::create( $this->discount_end )->toDayDateTimeString() : null,
			'description'      => $this->description,
			'attributes'       => ProductAttributeListResource::collection( $this->product_attributes ),
		];
	}
}

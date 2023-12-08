<?php
namespace App\Http\Resources;

use App\Manager\ImageManager;
use App\Manager\PriceManager;
use App\Models\ProductPhoto;
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
			'primary_photo'    => ImageManager::prepareImage( ProductPhoto::THUMB_UPLOAD_PATH, $this->primary_photo?->photo ),
			'name'             => $this->name,
			'slug'             => $this->slug,
			'status'           => $this->status == 1 ? 'Active' : 'Inactive',
			'sku'              => $this->sku,
			'stock'            => $this->stock,
			'cost'             => PriceManager::CURRENCY_SYMBOL . $this->cost,
			'price'            => PriceManager::CURRENCY_SYMBOL . $this->price,
			'discount_percent' => $this->discount_percent . ' %',
			'discount_fixed'   => PriceManager::CURRENCY_SYMBOL . $this->discount_fixed,
			'discount_start'   => $this->discount_start ? Carbon::create( $this->discount_start )->toDayDateTimeString() : null,
			'discount_end'     => $this->discount_end ? Carbon::create( $this->discount_end )->toDayDateTimeString() : null,
			'description'      => $this->description,
			'created_at'       => $this->created_at->toDayDateTimeString(),
			'updated_at'       => $this->created_at == $this->updated_at ? 'Not yet updated' : $this->updated_at->toDayDateTimeString(),
			'attributes'       => ProductAttributeListResource::collection( $this->product_attributes ),
		];
	}
}

<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest {
	/**
	 * Determine if the user is authorized to make this request.
	 */
	public function authorize(): bool {
		return true;
	}

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
	 */
	public function rules(): array {
		return [
			'name'             => 'required|string|min:3|max:255',
			'slug'             => 'required|string|min:3|max:255|unique:products',
			'category_id'      => 'required|numeric',
			'sub_category_id'  => 'numeric',
			'brand_id'         => 'numeric',
			'country_id'       => 'numeric',
			'supplier_id'      => 'numeric',
			'status'           => 'required|numeric',
			'sku'              => 'required|string|min:3|max:255|unique:products',
			'stock'            => 'required|numeric',
			'cost'             => 'required|numeric',
			'price'            => 'required|numeric',
			'discount_percent' => 'numeric',
			'discount_fixed'   => 'numeric',
			'description'      => 'required|string|min:3|max:1000',
		];
	}
}

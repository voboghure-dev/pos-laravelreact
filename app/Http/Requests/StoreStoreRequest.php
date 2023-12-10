<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreStoreRequest extends FormRequest {
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
			'name'        => 'required|min:3|max:255|string',
			'phone'       => 'required|numeric',
			'email'       => 'email',
			'status'      => 'required|numeric',
			'description' => 'max:1000|string',
			'address'     => 'required|min:3|max:1000|string',
			'division'    => 'required|min:3|max:255|string',
			'district'    => 'required|min:3|max:255|string',
			'area'        => 'required|min:3|max:255|string',
			'land_mark'   => 'min:3|max:255|string',
		];
	}
}

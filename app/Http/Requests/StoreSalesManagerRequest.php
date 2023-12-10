<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class StoreSalesManagerRequest extends FormRequest {
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
			'store_id'       => 'required|numeric',
			'name'           => 'required|min:3|max:255|string',
			'phone'          => 'required|numeric',
			'email'          => 'required|email',
			'password'       => [
				'required',
				Password::min( 8 )
					->letters()
					->mixedCase()
					->numbers()
					->symbols(),
			],
			'govt_id_number' => 'required|min:3|max:255|string',
			'status'         => 'required|numeric',
			'bio'            => 'max:1000|string',
			'address'        => 'required|min:3|max:1000|string',
			'division'       => 'required|min:3|max:255|string',
			'district'       => 'required|min:3|max:255|string',
			'area'           => 'required|min:3|max:255|string',
			'land_mark'      => 'min:3|max:255|string',
		];
	}
}

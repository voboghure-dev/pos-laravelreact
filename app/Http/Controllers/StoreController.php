<?php
namespace App\Http\Controllers;

use App\Http\Requests\StoreStoreRequest;
use App\Http\Requests\UpdateStoreRequest;
use App\Models\Address;
use App\Models\Store;
use Illuminate\Support\Str;

class StoreController extends Controller {
	/**
	 * Display a listing of the resource.
	 */
	public function index() {
		//
	}

	/**
	 * Show the form for creating a new resource.
	 */
	public function create() {
		//
	}

	/**
	 * Store a newly created resource in storage.
	 */
	public function store( StoreStoreRequest $request ) {
		$store_data   = ( new Store() )->prepareData( $request->all(), auth() );
		$address_data = ( new Address() )->prepareData( $request->all() );

		if ( $request->has( 'logo' ) ) {
			$name = Str::slug( $store_data['name'] . '-' . time() );

		}

		return $store_data;

		// return $request->all();
	}

	/**
	 * Display the specified resource.
	 */
	public function show( Store $store ) {
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 */
	public function edit( Store $store ) {
		//
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update( UpdateStoreRequest $request, Store $store ) {
		//
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy( Store $store ) {
		//
	}
}

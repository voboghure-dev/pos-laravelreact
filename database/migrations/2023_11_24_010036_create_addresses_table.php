<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
	/**
	 * Run the migrations.
	 */
	public function up(): void {
		Schema::create( 'addresses', function ( Blueprint $table ) {
			$table->id();
			$table->morphs( 'addressable' );
			$table->text( 'address' )->nullable();
			$table->string( 'division' )->nullable();
			$table->string( 'district' )->nullable();
			$table->string( 'area' )->nullable();
			$table->string( 'land_mark' )->nullable();
			$table->tinyInteger( 'status' )->nullable();
			$table->tinyInteger( 'type' )->nullable()->comment( '1 = supplier, 2 = customer present, 3 = customer permanent, 4 = shipping' );
			$table->timestamps();
		} );
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void {
		Schema::dropIfExists( 'addresses' );
	}
};

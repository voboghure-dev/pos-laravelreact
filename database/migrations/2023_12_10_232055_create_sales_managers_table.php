<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
	/**
	 * Run the migrations.
	 */
	public function up(): void {
		Schema::create( 'sales_managers', function ( Blueprint $table ) {
			$table->id();
			$table->foreignId( 'user_id' )->constrained()->cascadeOnUpdate()->cascadeOnDelete();
			$table->foreignId( 'store_id' )->constrained()->cascadeOnUpdate()->cascadeOnDelete();
			$table->string( 'name' )->nullable();
			$table->string( 'phone' )->nullable();
			$table->string( 'email' )->nullable();
			$table->string( 'password' )->nullable();
			$table->string( 'govt_id_number' )->nullable();
			$table->tinyInteger( 'status' )->nullable();
			$table->text( 'bio' )->nullable();
			$table->string( 'photo' )->nullable();
			$table->string( 'govt_id_photo' )->nullable();
			$table->timestamps();
		} );
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void {
		Schema::dropIfExists( 'sales_managers' );
	}
};

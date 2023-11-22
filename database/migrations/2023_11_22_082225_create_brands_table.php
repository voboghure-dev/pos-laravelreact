<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
	/**
	 * Run the migrations.
	 */
	public function up(): void {
		Schema::create( 'brands', function ( Blueprint $table ) {
			$table->id();
			$table->foreignId( 'user_id' )->constrained()->cascadeOnUpdate()->cascadeOnDelete();
			$table->string( 'name' )->nullable();
			$table->string( 'slug' )->nullable();
			$table->integer( 'serial' )->nullable();
			$table->tinyInteger( 'status' )->nullable();
			$table->text( 'description' )->nullable();
			$table->string( 'logo' )->nullable();
			$table->timestamps();
		} );
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void {
		Schema::dropIfExists( 'brands' );
	}
};

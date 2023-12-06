<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
	/**
	 * Run the migrations.
	 */
	public function up(): void {
		Schema::create( 'products', function ( Blueprint $table ) {
			$table->id();
			$table->foreignId( 'category_id' )->constrained()->cascadeOnUpdate()->cascadeOnDelete();
			$table->unsignedBigInteger( 'sub_category_id' )->nullable();
			$table->unsignedBigInteger( 'brand_id' )->nullable();
			$table->unsignedBigInteger( 'country_id' )->nullable();
			$table->unsignedBigInteger( 'supplier_id' )->nullable();
			$table->unsignedBigInteger( 'created_by' )->nullable();
			$table->unsignedBigInteger( 'updated_by' )->nullable();
			$table->string( 'name' )->nullable();
			$table->string( 'slug' )->nullable();
			$table->tinyInteger( 'status' )->nullable();
			$table->string( 'sku' )->nullable();
			$table->integer( 'stock' )->nullable();
			$table->double( 'cost' )->nullable();
			$table->double( 'price' )->nullable();
			$table->integer( 'discount_percent' )->nullable();
			$table->double( 'discount_fixed' )->nullable();
			$table->timestamp( 'discount_start' )->nullable();
			$table->timestamp( 'discount_end' )->nullable();
			$table->text( 'description' )->nullable();
			$table->timestamps();
		} );
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void {
		Schema::dropIfExists( 'products' );
	}
};

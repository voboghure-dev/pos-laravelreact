<?php
namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder {
	/**
	 * Run the database seeds.
	 */
	public function run(): void {
		$data = [
			'name'     => 'Admin',
			'email'    => 'admin@admin.com',
			'phone'    => '01973238664',
			'password' => Hash::make( 'admin123' ),
			'role_id'  => 1,
		];

		User::create( $data );
	}
}

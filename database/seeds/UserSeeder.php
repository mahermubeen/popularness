<?php

namespace Database\Seeders;

use App\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // User::factory()
        //     ->create();

        DB::table('users')->insert([
            ['name' =>'bunny','email'=>'bunny@gmail.com','password' => Hash::make('bunny')],
        ]);
    }
}

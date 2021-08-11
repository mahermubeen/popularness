<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddVideoIdsFieldInUserPlayListsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('user_play_lists', function (Blueprint $table) {
            $table->string('thumbnail')->nullable();
            $table->json('video_ids')->comment('[videoId1,videoId2...]')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('user_play_lists', function (Blueprint $table) {
            //
        });
    }
}

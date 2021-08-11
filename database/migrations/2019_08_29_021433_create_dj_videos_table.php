<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDjVideosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::create('dj_videos', function (Blueprint $table) {

            $table->bigIncrements('id');
            $table->string('brightcove_id')->default(0);
            $table->string('title');
            $table->mediumText('description');
            $table->string('keywords');
            $table->integer('user_id');
            $table->text('file');
            $table->string('convert_file');
            $table->string('image');
            $table->tinyInteger('status');
            $table->tinyInteger('prive')->default(0);
            $table->string('prive_type')->nullable();
            $table->string('artistname')->nullable();
            $table->string('featuredartist')->nullable();
            $table->string('director')->nullable();
            $table->string('producer')->nullable();
            $table->string('recordlabel')->nullable();
            $table->string('copyright')->nullable();
            $table->string('videotype')->nullable();
            $table->string('genres')->nullable();
            $table->integer('maingenres')->nullable();
            $table->string('email')->nullable();
            $table->string('videourl')->nullable();
            $table->string('song_download')->nullable();
            $table->string('ring_download')->nullable();
            $table->bigInteger('views')->nullable();
            $table->string('modifyDate')->nullable();
            $table->text('wistia')->nullable();
            $table->dateTime('publish_date')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('dj_videos');
    }
}

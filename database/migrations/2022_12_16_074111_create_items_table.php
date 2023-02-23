<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('item', function (Blueprint $table) {
            $table->id();
            $table->string('title', 100);
            $table->string('description')->nullable();
            $table->decimal('price', 6, 2);
            $table->string('genre', 50);
            $table->binary('file');
            $table->date('release');
            $table->timestamps();
        }); 
        $sql = 'alter table item change file file longblob';
        DB::statement($sql);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('item');
    }
};

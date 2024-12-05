<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('Campaigns', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->float("total_budget");
            $table->float("daily_budget");
            $table->json("files");
            $table->date("from");
            $table->date("to");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('Campaigns');
    }
};

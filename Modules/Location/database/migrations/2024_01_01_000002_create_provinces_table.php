<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('provinces', function (Blueprint $table) {
            $table->string('code', 20)->primary();
            $table->string('name');
            $table->string('name_en')->nullable();
            $table->string('full_name');
            $table->string('full_name_en')->nullable();
            $table->string('code_name')->nullable();
            $table->integer('administrative_unit_id')->nullable();
            $table->integer('administrative_region_id')->nullable();

            $table->foreign('administrative_region_id')
                ->references('id')
                ->on('administrative_regions');
            $table->foreign('administrative_unit_id')
                ->references('id')
                ->on('administrative_units');

            $table->index('administrative_region_id', 'idx_provinces_region');
            $table->index('administrative_unit_id', 'idx_provinces_unit');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('provinces');
    }
}; 
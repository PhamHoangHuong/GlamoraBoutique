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
        Schema::create('sources', function (Blueprint $table) {
            $table->id();
            $table->string('name', 255)->unique()->comment('Tên nguồn cung cấp');
            $table->string('address', 255)->comment('Địa chỉ cụ thể');
            $table->unsignedBigInteger('province_id')->nullable();
            $table->unsignedBigInteger('district_id')->nullable();
            $table->unsignedBigInteger('ward_id')->nullable();
            $table->boolean('active')->default(true);

            $table->foreign('province_id')->references('code')->on('provinces')->onDelete('set null');
            $table->foreign('district_id')->references('code')->on('districts')->onDelete('set null');
            $table->foreign('ward_id')->references('code')->on('wards')->onDelete('set null');


            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sources');
    }
};

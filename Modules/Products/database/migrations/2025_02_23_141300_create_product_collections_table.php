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
        if (Schema::hasTable('product_collections')) {
            Schema::dropIfExists('product_collections');
        }
        Schema::create('product_collections', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('product_id')->nullable()->comment('ID sản phẩm');
            $table->unsignedBigInteger('collection_id')->nullable()->comment('ID bộ sưu tập');
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
            $table->foreign('collection_id')->references('id')->on('collections')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_collections');
    }
};

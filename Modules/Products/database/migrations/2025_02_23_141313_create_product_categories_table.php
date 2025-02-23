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
        if (Schema::hasTable('product_categories')) {
            Schema::dropIfExists('product_categories');
        }
        Schema::create('product_categories', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('product_id')->nullable()->comment('ID sản phẩm');
            $table->unsignedBigInteger('category_id')->nullable()->comment('ID danh mục');
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_categories');
    }
};

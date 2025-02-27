<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('collections', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable()->comment('Tên bộ sưu tập');
            $table->string('slug')->nullable()->unique()->comment('Đường dẫn thân thiện');
            $table->string('description')->nullable()->comment('Mô tả bộ sưu tập');
            $table->text('content')->nullable()->comment('Giới thiệu bộ sưu tập');
            $table->string('image')->nullable()->comment('Ảnh bìa bộ sưu tập');
            $table->tinyInteger('status')->default(1)->comment('Trạng thái bộ sưu tập');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('collections');
    }
};

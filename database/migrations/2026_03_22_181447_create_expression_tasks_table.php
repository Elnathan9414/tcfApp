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
    Schema::create('expression_tasks', function (Blueprint $table) {
        $table->id();
        $table->integer('year'); // 2024, 2025...
        $table->string('month'); // juillet, aout, septembre...
        $table->integer('task_number'); // 1, 2, 3
        $table->string('label'); // Message, Narration, Argumentation
        $table->text('subject'); // Sujet officiel
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('expression_tasks');
    }
};

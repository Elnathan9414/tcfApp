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
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            // Texte de la question
            $table->text('text');

            // Choix multiples (JSON)
            $table->json('choices')->nullable();

            // Réponse correcte (A, B, C, D ou null pour expression écrite)
            $table->string('answer')->nullable();

            // Type de question : comprehension_ecrite, orale, expression_ecrite, etc.
            $table->string('type');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('questions');
    }
};

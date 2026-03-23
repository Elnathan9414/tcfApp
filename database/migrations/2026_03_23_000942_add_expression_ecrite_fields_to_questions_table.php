<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('questions', function (Blueprint $table) {

            // Champs Expression Écrite
            $table->integer('year')->nullable()->after('type');
            $table->string('month')->nullable()->after('year');
            $table->integer('task_number')->nullable()->after('month');
            $table->string('label')->nullable()->after('task_number');
            $table->text('subject')->nullable()->after('label');
        });
    }

    public function down(): void
    {
        Schema::table('questions', function (Blueprint $table) {
            $table->dropColumn([
                'year',
                'month',
                'task_number',
                'label',
                'subject',
            ]);
        });
    }
};
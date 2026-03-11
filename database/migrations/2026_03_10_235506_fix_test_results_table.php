<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
   public function up()
{
    Schema::table('test_results', function (Blueprint $table) {

        // Renommer la colonne "type" en "test_type"
        if (Schema::hasColumn('test_results', 'type')) {
            $table->renameColumn('type', 'test_type');
        }

        // Ajouter percentage si manquant
        if (!Schema::hasColumn('test_results', 'percentage')) {
            $table->integer('percentage')->after('total');
        }

        // Ajouter level si manquant
        if (!Schema::hasColumn('test_results', 'level')) {
            $table->string('level')->after('percentage');
        }

        // Supprimer answers si elle ne sert plus
        if (Schema::hasColumn('test_results', 'answers')) {
            $table->dropColumn('answers');
        }
    });
}

public function down()
{
    Schema::table('test_results', function (Blueprint $table) {

        if (Schema::hasColumn('test_results', 'test_type')) {
            $table->renameColumn('test_type', 'type');
        }

        if (Schema::hasColumn('test_results', 'percentage')) {
            $table->dropColumn('percentage');
        }

        if (Schema::hasColumn('test_results', 'level')) {
            $table->dropColumn('level');
        }

        // On ne recrée pas answers automatiquement
    });
}
};

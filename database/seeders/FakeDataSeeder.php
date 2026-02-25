<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Question;
use App\Models\TestResult;

class FakeDataSeeder extends Seeder
{
    public function run(): void
    {
        // 50 questions
        Question::factory()->count(50)->create();

        // 20 résultats de tests
        TestResult::factory()->count(20)->create();
    }
}
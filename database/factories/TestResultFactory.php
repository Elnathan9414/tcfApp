<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

class TestResultFactory extends Factory
{
    public function definition(): array
    {
        $types = ['orale', 'ecrite', 'expression_ecrite', 'expression_orale'];
        $type = $this->faker->randomElement($types);

        $total = $this->faker->numberBetween(10, 20);
        $score = in_array($type, ['orale', 'ecrite'])
            ? $this->faker->numberBetween(0, $total)
            : null;

        return [
            'user_id' => User::factory(),
            'type' => $type,
            'score' => $score,
            'total' => $total,
            'answers' => [
                1 => $this->faker->sentence(3),
                2 => $this->faker->sentence(3),
                3 => $this->faker->sentence(3),
            ],
        ];
    }
}
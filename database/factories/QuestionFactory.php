<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Inertia\Testing\Concerns\Has;

class QuestionFactory extends Factory
{
    public function definition(): array

    {
        
        $types = ['orale', 'ecrite', 'expression_ecrite', 'expression_orale'];

        $type = $this->faker->randomElement($types);

        return [
            'text' => $this->faker->sentence(12),
            'choices' => in_array($type, ['orale', 'ecrite'])
                ? [
                    "A. " . $this->faker->sentence(4),
                    "B. " . $this->faker->sentence(4),
                    "C. " . $this->faker->sentence(4),
                    "D. " . $this->faker->sentence(4),
                ]
                : [],
            'answer' => in_array($type, ['orale', 'ecrite'])
                ? $this->faker->randomElement(['A', 'B', 'C', 'D'])
                : null,
            'type' => $type,
        ];
    }
}
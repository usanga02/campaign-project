<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Campaign>
 */
class CampaignFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
            'name' => $this->faker->name(),
            'total_budget' => $this->faker->randomFloat(2,100,10000),
            'daily_budget' => $this->faker->randomFloat(2,100,10000),
            'files' => $this->faker->name(),
            'from' => $this->faker->dateTimeThisDecade(),
            'to' => $this->faker->dateTimeThisDecade(),
        ];
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Campaign extends Model
{
    /** @use HasFactory<\Database\Factories\CampaignFactory> */
    use HasFactory;

    protected $casts = [
        'files' => 'array',
    ];

    protected $fillable = [
        'name',
        'daily_budget',
        'total_budget',
        'files',
        'from',
        'to',
    ];
}

<?php

namespace App\Models;

use Illuminate\Cache\HasCacheLock;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TestResult extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'test_type',
        'score',
        'total',
        'percentage',
        'level',
    ];




}

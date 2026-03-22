<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ExpressionTask extends Model
{
     protected $fillable = [
        'year',
        'month',
        'task_number',
        'label',
        'subject',
    ];


}

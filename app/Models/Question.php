<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Storage;

class Question extends Model
{
    use HasFactory;

    protected $table = 'questions';

    protected $fillable = [
        // Champs communs
        'type',

        // QCM
        'exercise_number',
        'question',
        'choices',
        'answer',
        'audio',
        'image',

        // Expression écrite
        'year',
        'month',
        'task_number',
        'label',
        'subject',
    ];

    protected $casts = [
        'choices' => 'array',
    ];

    /* -----------------------------------------
     |  ACCESSORS POUR LES URLS AUDIO / IMAGE
     ----------------------------------------- */

    public function getAudioUrlAttribute()
    {
        if (!$this->audio) {
            return null;
        }

        return Storage::disk('s3')->url($this->audio);
    }

    public function getImageUrlAttribute()
    {
        if (!$this->image) {
            return null;
        }

        return Storage::disk('s3')->url($this->image);
    }

    /* -----------------------------------------
     |  HELPERS POUR SAVOIR LE TYPE
     ----------------------------------------- */

    public function isExpressionEcrite()
    {
        return $this->type === 'expression_ecrite';
    }

    public function isQcm()
    {
        return in_array($this->type, [
            'comprehension_orale',
            'structure_langue',
            'comprehension_ecrite'
        ]);
    }
}
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Question extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'exercise_number',
        'question',
        'choices',
        'answer',
        'audio',
        'image',
    ];

    protected $casts = [
        'choices' => 'array',
    ];

    protected $appends = [
        'image_url',
        'audio_url',
    ];

    public function getImageUrlAttribute()
    {
        return $this->image
            ? Storage::disk('s3')->url($this->image)
            : null;
    }

    public function getAudioUrlAttribute()
    {
        return $this->audio
            ? Storage::disk('s3')->url($this->audio)
            : null;
    }
}
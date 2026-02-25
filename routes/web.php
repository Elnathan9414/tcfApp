<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AIQuestionController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\TestController;


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::post('/ai/questions', [AIQuestionController::class, 'generate'])
    ->middleware('auth')
    ->name('ai.questions');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
     Route::get('/tests', function () {
        return Inertia::render('Tests/Index');
    });

    Route::get('/tests/start', function () {
        return Inertia::render('Tests/Start');
    });
      Route::get('/tests/options', function () {
        return Inertia::render('Tests/Options');
    });

    Route::get('/tests/start/{type}', function ($type) {
        return Inertia::render('Tests/Start', [
            'type' => $type
        ]);
    });






    Route::middleware('auth')->get('/questions/test/{type}', [QuestionController::class, 'index']);
   Route::middleware(['auth'])->group(function () {
    Route::get('/tests/end', function () {
        return Inertia::render('Tests/End');
    })->name('tests.end');
});
   

Route::middleware('auth')->post('/tests/summary', [TestController::class, 'summary'])
    ->name('tests.summary');

});


require __DIR__.'/auth.php';

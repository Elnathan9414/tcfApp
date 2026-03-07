<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TestController;
use App\Http\Controllers\DashboardController;
use App\Models\Question;
use App\Http\Controllers\Admin\QuestionController;


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});



Route::middleware(['auth', 'verified'])
    ->get('/dashboard', [DashboardController::class, 'index'])
    ->name('dashboard');



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

    Route::get('/tests/start/{url}', function ($url) {
        return Inertia::render('Tests/Start', [
            'url' => $url
        ]);
    });



Route::middleware(['auth'])->get('/comprehension-orale', function () {
    return Inertia::render('ComprehensionOrale', [
        'questions' => Question::where('type', 'comprehension_orale')
            ->orderBy('exercise_number')
            ->get()
    ]);
})->name('comprehension.orale');

Route::middleware(['auth'])->group(function () {

    
    Route::get('/comprehension-ecrite', [QuestionController::class, 'comprehensionEcrite']);
    Route::get('/structure-de-la-langue', [QuestionController::class, 'structureLangue']);

});



Route::middleware(['auth'])->prefix('admin')->group(function () {
    Route::get('/questions', [QuestionController::class, 'index'])->name('admin.questions.index');
    Route::post('/questions', [QuestionController::class, 'store'])->name('admin.questions.store');
    Route::put('/questions/{id}', [QuestionController::class, 'update'])->name('admin.questions.update');
    Route::delete('/questions/{id}', [QuestionController::class, 'destroy'])->name('admin.questions.destroy');
});

Route::middleware('auth')->post('/tests/summary', [TestController::class, 'summary'])
    ->name('tests.summary');

});


require __DIR__.'/auth.php';

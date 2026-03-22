<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\TestController;
use App\Http\Controllers\Admin\QuestionController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\TestResultController;
use App\Http\Controllers\ExpressionEcriteController;    

/*
|--------------------------------------------------------------------------
| PUBLIC ROUTES
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

/*
|--------------------------------------------------------------------------
| DASHBOARD
|--------------------------------------------------------------------------
*/

Route::middleware(['auth'])
    ->group(function () {
        Route::get('/student/dashboard', [DashboardController::class, 'student'])
            ->name('student.dashboard');

        Route::post('/results', [TestResultController::class, 'store'])
            ->name('results.store');
    });

/*
|--------------------------------------------------------------------------
| AUTHENTICATED USER ROUTES
|--------------------------------------------------------------------------
*/

Route::middleware('auth')->group(function () {

    /*
    | PROFILE
    */

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    /*
    | TEST PAGES
    */

    Route::get('/tests', fn () => Inertia::render('Tests/Index'));
    Route::get('/tests/start', fn () => Inertia::render('Tests/Start'));
    Route::get('/tests/options', fn () => Inertia::render('Tests/Options'));

    Route::get('/tests/start/{url}', function ($url) {
        return Inertia::render('Tests/Start', [
            'url' => $url
        ]);
    });

    /*METHODOLOGIE*/

    Route::middleware(['auth'])->group(function () {
    Route::get('/methodologie', function () {
        return Inertia::render('Methodologie');
    })->name('methodologie');
});


    /*
    | TEST QUESTIONS
    */

    Route::get('/comprehension-orale', [QuestionController::class, 'comprehensionOrale']) ->name('comprehension.orale');
    Route::get('/comprehension-ecrite', [QuestionController::class, 'comprehensionEcrite']) ->name('comprehension.ecrite');
    Route::get('/structure-de-la-langue', [QuestionController::class, 'structureLangue']) ->name('structure.langue');
    




Route::middleware(['auth'])->group(function () {

    // Niveau 1 : années
    Route::get('/expression-ecrite', [ExpressionEcriteController::class, 'years']);

    // Niveau 2 : mois
    Route::get('/expression-ecrite/{year}', [ExpressionEcriteController::class, 'months']);

    // Niveau 3 : tâches
    Route::get('/expression-ecrite/{year}/{month}', [ExpressionEcriteController::class, 'tasks']);
    Route::get('/expression-ecrite/{year}/{month}/tache/{task}', [ExpressionEcriteController::class, 'write']);

});

        
    /*
    | TEST SUBMISSIONS
    */

    Route::post('/submit-comprehension-orale', [QuestionController::class, 'submitComprehensionOrale']) ->name('submit.comprehension_orale');
     Route::post('/submit-comprehension-ecrite', [QuestionController::class, 'submitComprehensionEcrite']) ->name('submit.comprehension_ecrite');
    Route::post('/submit-structure-langue', [QuestionController::class, 'submitStructureLangue']) ->name('submit.structure_langue');
    route::post('/submit-comprehension-ecrite', [QuestionController::class, 'submitComprehensionEcrite']) ->name('submit.comprehension_ecrite');   

    Route::post('/tests/summary', [TestController::class, 'summary'])
        ->name('tests.summary');



    /*
        TEST RESULTS
    */

    Route::middleware(['auth'])->group(function () {

    // Enregistrement des résultats
    Route::post('/results/comprehension-orale', [TestResultController::class, 'submitComprehensionOrale'])
        ->name('results.comprehension_orale');

    Route::post('/results/comprehension-ecrite', [TestResultController::class, 'submitComprehensionEcrite'])
        ->name('results.comprehension_ecrite');

    Route::post('/results/structure-langue', [TestResultController::class, 'submitStructureLangue'])
        ->name('results.structure_langue');
});
        
    /*
    |--------------------------------------------------------------------------
    | ADMIN PANEL
    |--------------------------------------------------------------------------
    */

    Route::prefix('admin')->group(function () {

        // ADMIN uniquement
        Route::middleware('role:admin')->group(function () {
            Route::resource('users', UserController::class);
        });

        // ADMIN + CONTRIBUTORS
        Route::middleware('role:admin,contributor')->group(function () {
            Route::resource('questions', QuestionController::class);
        });

    });

});

require __DIR__.'/auth.php';
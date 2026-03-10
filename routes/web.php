
<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\TestController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Admin\QuestionController;
use App\Http\Controllers\Admin\UserController;

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

Route::middleware(['auth', 'verified'])
    ->get('/dashboard', [DashboardController::class, 'index'])
    ->name('dashboard');

/*
|--------------------------------------------------------------------------
| AUTHENTICATED USER ROUTES
|--------------------------------------------------------------------------
*/

Route::middleware('auth')->group(function () {

    /*
    |--------------------------------------------------
    | PROFILE
    |--------------------------------------------------
    */

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    /*
    |--------------------------------------------------
    | TESTS PAGES
    |--------------------------------------------------
    */

    Route::get('/tests', fn () => Inertia::render('Tests/Index'));
    Route::get('/tests/start', fn () => Inertia::render('Tests/Start'));
    Route::get('/tests/options', fn () => Inertia::render('Tests/Options'));

    Route::get('/tests/start/{url}', function ($url) {
        return Inertia::render('Tests/Start', [
            'url' => $url
        ]);
    });

    /*
    |--------------------------------------------------
    | TESTS QUESTIONS
    |--------------------------------------------------
    */

    Route::get('/comprehension-orale', [QuestionController::class, 'comprehensionOrale']);
    Route::get('/comprehension-ecrite', [QuestionController::class, 'comprehensionEcrite']);
    Route::get('/structure-de-la-langue', [QuestionController::class, 'structureLangue']);

    /*
    |--------------------------------------------------
    | TESTS SUBMISSIONS
    |--------------------------------------------------
    */

    Route::post('/submit-comprehension-orale', [QuestionController::class, 'submitComprehensionOrale']);
    Route::post('/submit-comprehension-ecrite', [QuestionController::class, 'submitComprehensionEcrite']);
    Route::post('/submit-structure-langue', [QuestionController::class, 'submitStructureLangue']);

    Route::post('/tests/summary', [TestController::class, 'summary'])
        ->name('tests.summary');
});

/*
|--------------------------------------------------------------------------
| ADMIN PANEL
|--------------------------------------------------------------------------
*/

Route::middleware(['auth'])->prefix('admin')->group(function () {

    /*
    |--------------------------------------------------
    | ADMIN ONLY
    |--------------------------------------------------
    */

    Route::middleware('role:admin')->group(function () {

        // Gestion des utilisateurs
        Route::resource('users', UserController::class);

    });

    /*
    |--------------------------------------------------
    | ADMIN + CONTRIBUTORS
    |--------------------------------------------------
    */

    Route::middleware('role:admin,contributor')->group(function () {

        // Gestion des questions
        Route::resource('questions', QuestionController::class);

    });

});

require __DIR__ . '/auth.php';
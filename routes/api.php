<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CourseController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::get('/auth/google', [AuthController::class, 'redirectToAuth']);
Route::get('/auth/google/callback', [AuthController::class, 'handleAuthCallback']);

Route::get('/auth/facebook', [AuthController::class, 'redirectToAuthFacebook']);
Route::get('/auth/facebook/callback', [AuthController::class, 'handleAuthCallbackFacebook']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/courses/{category}', [CourseController::class, 'getCourseByCategory']);
Route::get('/courses/course/{courseId}', [CourseController::class, 'getCourseById']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/profile', function(Request $request) {
        return auth()->user();
    });
    Route::get('/logout', [AuthController::class, 'logout']);
    Route::post('/course/create', [CourseController::class, 'createCourse']);
    Route::post('/course/review/create', [CourseController::class, 'createReview']);
    Route::get('/course/mycourses/{userId}', [CourseController::class, 'getMyCreatedCourses']);
    
});

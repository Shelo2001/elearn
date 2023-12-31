<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\VideoController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\NotificationsController;

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
    Route::get('/course/myordered/{userId}', [CourseController::class, 'getMyOrderedCourses']);
    Route::get('/notifications/{userId}',[NotificationsController::class, 'getNotifications']);
});
Route::post('/stripe',[PaymentController::class,'stripePost']);
Route::post('/paypal',[PaymentController::class,'paypalPost']);

Route::post('/upload/video',[VideoController::class, 'upload']);
Route::get('/course/{courseId}/videos',[VideoController::class, 'getCourseVideos']);
Route::get('/video/{video}',[VideoController::class, 'streamVideo']);
Route::put('/notifications/{notificationsId}/seen',[NotificationsController::class, 'setNotificationsToSeen']);
Route::post('/notifications/delete',[NotificationsController::class, 'deleteNotifications']);
Route::get('/course/mylearning/{userId}',[CourseController::class, 'getMyLearning']);
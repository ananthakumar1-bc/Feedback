<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FeedbackController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
//Route::apiResource('feedback', FeedbackController::class);
Route::get('feedbacks', [FeedbackController::class,'index']);
Route::post('feedback', [FeedbackController::class,'store']);
Route::put('feedback/{id}', [FeedbackController::class,'update']);
Route::delete('feedback/{id}', [FeedbackController::class,'destroy']);


//Route::apiResource('feedback/update', FeedbackController::class);

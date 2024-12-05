<?php

use App\Http\Controllers\Api\V1\CampaignController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::group(['prefix'=>'v1','namespace'=>'App\Http\Controllers\Api\V1'],function(){
    Route::apiResource('campaigns', CampaignController::class); 
    Route::get('/campaigns/{campaignId}/images', [CampaignController::class, 'getCampaignImages']); 
});
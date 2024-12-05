<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Campaign;
use App\Http\Requests\V1\StoreCampaignRequest;
use App\Http\Requests\V1\UpdateCampaignRequest;
use App\Http\Controllers\Controller;
use App\Http\Requests\V1\GetCampaignImagesRequest;
use App\Http\Resources\V1\CampaignResource;
use App\Http\Resources\V1\CampaignCollection;

class CampaignController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return new CampaignCollection(Campaign::paginate(9));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCampaignRequest $request)
    {
        //
        $imagePaths = [];

        $image_get = $request->images;
        foreach ($image_get as $image) {
            error_log(json_encode($image));
            error_log($request->name);
            $fileOriginalName = $image->getClientOriginalExtension();
            $fileNewName = time() .'.'. $fileOriginalName;
            $filePath = $image->storeAs('images', $fileNewName, 'public'); //here images is folder, $fileNewName is files new name, public indicated public folder. that means folder this image in public/storage/images folder;
                $imagePaths[] = $filePath;
        }
        
        $data = array_merge($request->all(), ['files' => json_encode($imagePaths)]);
        return new CampaignResource(Campaign::create($data));
    }

    /**
     * Display the specified resource.
     */
    public function show(Campaign $Campaign)
    {
        //
        return new CampaignResource($Campaign);
    }

    public function getCampaignImages($campaignId)
{
    $campaign = Campaign::find($campaignId);
    $imageUrls = array_map(function($path) {
        return asset('storage/' . $path);
    }, json_decode($campaign->files) ?? []);

    return response()->json(['images' => $imageUrls]);
}

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Campaign $Campaign)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCampaignRequest $request, Campaign $campaign)
    {
        //
        $campaign->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Campaign $Campaign)
    {
        //
    }
}

<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CampaignResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            "name"=> $this->name,
            "total_budget"=> $this->total_budget,
            "daily_budget"=> $this->daily_budget,
            "files"=> $this->files,
            "from"=> $this->from,
            "to"=> $this->to,
        ];
    }
}

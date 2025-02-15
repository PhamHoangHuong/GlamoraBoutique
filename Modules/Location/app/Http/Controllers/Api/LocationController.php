<?php

namespace Modules\Location\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Modules\Location\Http\Resources\AdministrativeRegionResource;
use Modules\Location\Http\Resources\ProvinceResource;
use Modules\Location\Http\Resources\DistrictResource;
use Modules\Location\Http\Resources\WardResource;
use Modules\Location\Models\AdministrativeRegion;
use Modules\Location\Models\Province;
use Modules\Location\Models\District;
use Modules\Location\Models\Ward;

class LocationController extends Controller
{
    /**
     * Get all regions
     */
    public function getRegions(): JsonResponse
    {
        $regions = AdministrativeRegion::all();
        return response()->json([
            'data' => AdministrativeRegionResource::collection($regions)
        ]);
    }

    /**
     * Get all provinces or provinces by region
     */
    public function getProvinces(?int $regionId = null): JsonResponse
    {
        $query = Province::with(['administrativeUnit', 'administrativeRegion']);
        
        if ($regionId) {
            $query->where('administrative_region_id', $regionId);
        }
        
        $provinces = $query->get();
        
        return response()->json([
            'data' => ProvinceResource::collection($provinces)
        ]);
    }

    /**
     * Get districts by province
     */
    public function getDistricts(string $provinceCode): JsonResponse
    {
        $districts = District::with(['administrativeUnit', 'province'])
            ->where('province_code', $provinceCode)
            ->get();
            
        return response()->json([
            'data' => DistrictResource::collection($districts)
        ]);
    }

    /**
     * Get wards by district
     */
    public function getWards(string $districtCode): JsonResponse
    {
        $wards = Ward::with(['administrativeUnit', 'district'])
            ->where('district_code', $districtCode)
            ->get();
            
        return response()->json([
            'data' => WardResource::collection($wards)
        ]);
    }
} 
<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;

class NutrientsController extends Controller
{
    private $privateApiUrl;

    public function __construct()
    {
        $this->privateApiUrl = env('PRIVATE_API_URL');
    }

    public function index(Request $request)
    {
        $limit = $request->get('limit');
        $page = $request->get('page');

        $response = Http::get("{$this->privateApiUrl}/nutrients", [
            'query' => [
                'page' => $page,
                'limit' => $limit,
            ]
        ]);
        return $response->json();
    }

    public function show(int $nutrientID)
    {
        $response = Http::get("{$this->privateApiUrl}/nutrients/{$nutrientID}");
        return $response->json();
    }

    public function create(Request $request)
    {
        $bodyContent = $request->all();
        $response = Http::post("{$this->privateApiUrl}/nutrients", [
            'name' => $bodyContent['name'],
            'unitName' => $bodyContent['unitName'],
            'nutrientCode' => $bodyContent['nutrientCode'],
            'rank' => $bodyContent['rank'],
        ]);
        return $response->json();
    }

    public function remove(int $nutrientID)
    {
        $response = Http::delete("{$this->privateApiUrl}/nutrients/{$nutrientID}");
        return $response->json();
    }


    public function update(Request $request , int $nutrientID)
    {
        $bodyContent = $request->all();

        $response = Http::put("{$this->privateApiUrl}/nutrients/{$nutrientID}", [
            'name' => $bodyContent['name'],
            'unitName' => $bodyContent['unitName'],
            'nutrientCode' => $bodyContent['nutrientCode'],
            'rank' => $bodyContent['rank'],
        ]);
        return $response->json();
    }
}

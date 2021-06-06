<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserFoodController extends Controller
{
    private $privateApiUrl;

    public function __construct()
    {
        $this->privateApiUrl = env('PRIVATE_API_URL');
    }

    public function foods(int $userId)
    {
        $response = Http::get("{$this->privateApiUrl}/users/{$userId}/foods");
        return $response->json();
    }

    public function food(int $userId, int $foodId)
    {
        $response = Http::get("{$this->privateApiUrl}/users/{$userId}/foods/{$foodId}");
        return $response->json();
    }

    public function deleteFood(int $userId, int $foodId)
    {
        $response = Http::delete("{$this->privateApiUrl}/users/{$userId}/foods/{$foodId}");
        return $response->json();
    }

    public function addFood(Request $request, int $userId, int $foodId)
    {
        $validation = Validator::make($request->all(), [
            'servingsPerWeek' => 'required|numeric|min:1',
        ]);
        //return $request->input();
        if($validation->fails()){
            return App::abort(404);
        } else {
            $servingsPerWeek = $request->input('servingsPerWeek');

            $response = Http::put("{$this->privateApiUrl}/users/{$userId}/foods/{$foodId}", [
                'servingsPerWeek' => $servingsPerWeek
            ]);
            return $response->json();
        }
    }
}

<?php

namespace App\Http\Controllers;

use App\City;
use App\Country;
use App\State;
use App\User;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    // public function __construct()
    // {
    //     $this->middleware('auth');
    // }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('home');
    }

    public function test()
    {
        return User::all();
    }

    public function countries()
    {
        return Country::all();
    }

    public function states($countryId = null)
    {
        return State::when($countryId, function($query) use ($countryId) {
            return $query->where('country_id', $countryId);
        })
        ->get();
    }
    
    public function cities($stateId = null)
    {
        set_time_limit(100);
        
        return City::when($stateId, function($query) use ($stateId) {
            return $query->where('state_id', $stateId);
        })->get();
    }

    public function cityByStateId(Request $request)
    {
        $request->validate([
            'stateId' => 'required',

        ]);

        return City::where('state_id', $request->stateId)->get();
    }
}

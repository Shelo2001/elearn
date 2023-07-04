<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use GuzzleHttp\Exception\ClientException;
use Laravel\Socialite\Contracts\User as SocialiteUser;

class AuthController extends Controller
{
    public function redirectToAuth(): JsonResponse
    {
        return response()->json([
            'url' => Socialite::driver('google')->stateless()->redirect()->getTargetUrl(),
        ]);
    }

    public function handleAuthCallback()
    {
        $user = Socialite::driver('google')->stateless()->user();

        $existingUser = User::where('email', $user->email)->first();
    
        if ($existingUser) {
            Auth::login($existingUser);
            $token = $existingUser->createToken('auth-token')->plainTextToken;
        } else {
            $newUser = new User();
            $newUser->name = $user->name;
            $newUser->email = $user->email;
            $newUser->password = bcrypt(Str::random(10));
            $newUser->save();
    
            Auth::login($newUser);
            $token = $newUser->createToken('auth-token')->plainTextToken;
        }
    
        $user =User::find(Auth::id());


        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function register(Request $request){
        $attr = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users,email',
            'password' => 'required|string|min:6'
        ]);

        $user = User::create([
            'name' => $attr['name'],
            'password' => bcrypt($attr['password']),
            'email' => $attr['email']
        ]);
        $token = $user->createToken('auth-token')->plainTextToken;
        return response([
            "token"=>$token,
            "user"=>$user
        ],201);
    }

    public function login(Request $request){
        $attr = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string|min:6'
        ]);

        if (!Auth::attempt($attr)) {
            return response()->json([
                'error' => 'Credentials not match',
            ], 401);
        }

        $user = Auth::user();
        
        return response([
            'token' => auth()->user()->createToken('auth-token')->plainTextToken,
            'user' => auth()->user()
        ], 200);
    }

    public function logout(Request $request){
        auth()->user()->currentAccessToken()->delete();

        return response(["message"=>"Successfully logged out"],200);
    }
}
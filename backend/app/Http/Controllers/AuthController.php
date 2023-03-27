<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Laravel\Passport\Http\Controllers\AccessTokenController;
use Psr\Http\Message\ServerRequestInterface as Requeste;



class AuthController extends AccessTokenController {

    public function issueToken(Requeste $request)
    {
        $email = $request->getParsedBody()['username'];
        $user = User::where('email', $email)->first();
        $name = $user ->name;
        $response = parent::issueToken($request);
        $access_token = json_decode($response->getContent(), true);
        $access_token['user_name'] = $name;
        return $access_token;
    }

  public function me()
  {
    return response()->json(auth()->user());

  }
}

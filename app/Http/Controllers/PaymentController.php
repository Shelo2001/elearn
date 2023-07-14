<?php

namespace App\Http\Controllers;

use Stripe;

use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function stripePost(Request $request){
        try {
            $stripe = new \Stripe\StripeClient(
                env('STRIPE_SECRET')
              );
              $res = $stripe->tokens->create([
                'card' => [
                    'number' => '4242424242424242',
                    'exp_month' => 1,
                    'exp_year' => 2024,
                    'cvc' => '314',
                ],
              ]);

              Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));

              $response = $stripe->charges->create([
                'amount' => $request->amount,
                'currency' => 'usd',
                'source' =>  $res->id,
                'description' =>  "SCRIBLY SUBSCRIPTION",
              ]);
              return response([$response->status],201);
        } catch (Exception $ex) {
            return response(['response'=>"error"],500);
        }
    }
}

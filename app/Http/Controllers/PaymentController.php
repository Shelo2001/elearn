<?php

namespace App\Http\Controllers;

use Stripe;

use App\Models\Order;
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
            'description' =>  "UDEMY COURSE",
          ]);

          foreach ($request->courses as $course) {
            $order = new Order();
            $order->course_id = $course['id'];
            $order->user_id = $request->user_id;
            $order->save();
          }
        
          return response([$response->status],201);
    } catch (Exception $ex) {
        return response(['response'=>"error"],500);
    }
}

    public function paypalPost(Request $request){
      try {
            foreach ($request->courses as $course) {
              $order = new Order();
              $order->course_id = $course['id'];
              $order->user_id = $request->user_id;
              $order->save();
            }
          
            return response(["success"=>true],201);
      } catch (Exception $ex) {
          return response(['response'=>"error"],500);
      }
  }
}

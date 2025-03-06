<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use Illuminate\Http\Request;


class FeedbackController extends Controller
{

    public function index(){
        return response()->json(Feedback::all(),200);
    }

    public function store(Request $request){

        $request->validate([
            'name' =>'required',
            'email' => 'required|email|unique:feedback,email',
            'rating' =>'required'
        ]);
        $feedback = Feedback::create($request->all());
        return response()->json($feedback,200);

    }

    public function update(Request $request,$id){
    $feedback = Feedback::find($id);
     if(!$feedback){
         return response()->json(['message'=>'Feedback not found']);
     }
    $feedback->update($request->all());
    return response()->json($feedback,200);    
    }

    public function destroy($id){
        $feedback = Feedback::find($id);
    if(!$feedback){
        return response()->json(['message'=>'Feedback not found']);
    }

        $feedback->delete();
        return response()->json(['message'=>'Feedback deleted']);
    }

}
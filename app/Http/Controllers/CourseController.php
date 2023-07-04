<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;

class CourseController extends Controller
{
    public function createCourse(Request $request){
        $attr = $request->validate([
            'title' => 'required',
            'description' => 'required',
            'duration_minutes'=>'required',
            'price' => 'required',
            'category' => 'required',
            'author' => 'required',
            'image' => 'required'
        ]);

        $course = new Course();
        $course->title = $request->title;
        $course->description = $request->description;
        $course->duration_minutes = $request->duration_minutes;
        $course->price = $request->price;
        $course->category = $request->category;
        $course->author = $request->author;
        if($request->image!=''){
            $strpos = strpos($request->image, ';');
            $sub = substr($request->image, 0, $strpos);
            $ex = explode('/', $sub)[1];
            $name = time().'.'.$ex;
            $img = Image::make($request->image);
            $upload_path = public_path()."/upload/";
            $img->save($upload_path.$name);
            $course->image = $name;
        } else {
            $course->image = 'image.png';
        }
        $course->save();
        return response([
        "course"=>$course,"success"=>true],201);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Rating;
use App\Models\Comment;
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
            'user_id' => 'required',
            'image' => 'required'
        ]);

        $course = new Course();
        $course->title = $request->title;
        $course->description = $request->description;
        $course->duration_minutes = $request->duration_minutes;
        $course->price = $request->price;
        $course->category = $request->category;
        $course->user_id = $request->user_id;
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

    public function getCourseByCategory($category){
        $courses = Course::where('category',$category)->where('is_published',true)->with('user:id,name','rating')->paginate(8);
        return response(["courses"=>$courses,],200);
    }

    public function getCourseById($courseId){
        $course = Course::where('id',$courseId)->where('is_published',true)->with('user:id,name','rating','comment.user:id,name')->first();
        return response(["course"=>$course,],200);
    }

    public function createReview(Request $request){
        $attr = $request->validate([
            'course_id' => 'required',
            'user_id' => 'required',
            'rating' => 'required',
            'comment' => 'required'
        ]);

        $rating = new Rating();
        $comment = new Comment();
        $rating->course_id = $request->course_id;
        $rating->user_id = $request->user_id;
        $rating->rating = $request->rating;
        $comment->course_id = $request->course_id;
        $comment->user_id = $request->user_id;
        $comment->comment = $request->comment;
        $rating->save();
        $comment->save();
        return response(["success"=>true],201);
    }

    public function getMyCreatedCourses($userId){
        $courses = Course::where('user_id',$userId)->with('user:id,name','rating','comment.user:id,name')->get();

        return response(["courses"=>$courses],200);
    }
}

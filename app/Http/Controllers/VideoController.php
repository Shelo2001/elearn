<?php

namespace App\Http\Controllers;

use App\Models\Video;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Illuminate\Support\Facades\Response;

class VideoController extends Controller
{
    public function upload(Request $request)
    {
        if ($request->hasFile('video')) {
            $newVideo=new Video();
            $video = $request->file('video');
            $filename = time() . '.' . $video->getClientOriginalExtension();
            $video->move(public_path('upload'), $filename);
            $newVideo->title=$request->title;
            $newVideo->course_id=$request->course_id;
            $newVideo->video=$filename;
            $newVideo->save();
            return response([
                "video"=>$newVideo,"success"=>true],201);
           
        }

        return response()->json(['error' => 'Video not found.'], 400);
    }

    public function getCourseVideos($courseId)
    {
        $courseVideos = Video::where('course_id',$courseId)->get();
        return response(["courseVideos"=>$courseVideos,],200);
    }

   
        public function streamVideo($video)
        {
            $filePath = public_path('upload/' . $video);

            if (!file_exists($filePath)) {
                abort(404);
            }

            $headers = [
                'Content-Type' => 'video/mp4',
                'Accept-Ranges' => 'bytes',
            ];

            return Response::file($filePath, $headers);
    }
}

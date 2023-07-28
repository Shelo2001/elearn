<?php

namespace App\Http\Controllers;

use App\Models\Video;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;

class VideoController extends Controller
{
    public function upload(Request $request)
    {
        if ($request->hasFile('video')) {
            $newVideo = new Video();
            $video = $request->file('video');
    
            // Generate a unique filename for the video
            $filename = time() . '.' . $video->getClientOriginalExtension();
    
            // Move the video file to the temporary location for chunking
            $temporaryPath = $video->storeAs('upload/temp', $filename);
    
            // Get the total size of the video file for progress tracking
            $totalSize = Storage::size($temporaryPath);
    
            // Initialize the number of uploaded bytes to 0
            $uploadedBytes = 0;
    
            // Open the temporary video file for reading
            $file = fopen(storage_path('app/' . $temporaryPath), 'rb');
    
            // Set the chunk size for reading the file (adjust as needed)
            $chunkSize = 8192; // 8KB
    
            // Open the video file to be written
            $writeFile = fopen(public_path('upload/' . $filename), 'wb');
    
            // Loop through and read chunks from the temporary file
            while (!feof($file)) {
                // Read a chunk from the temporary file
                $chunk = fread($file, $chunkSize);
    
                // Write the chunk to the new video file
                fwrite($writeFile, $chunk);
    
                // Increment the number of uploaded bytes
                $uploadedBytes += strlen($chunk);
    
                // Calculate the current progress percentage
                $progress = round(($uploadedBytes / $totalSize) * 100);
    
                // Optional: You can also update the progress in the database or session
                // if you need to track the progress over multiple requests
    
                // Flush the output buffer to send the progress response immediately
                ob_flush();
                flush();
            }
    
            // Close the file streams after writing is complete
            fclose($file);
            fclose($writeFile);
    
            // Delete the temporary video file
            Storage::delete($temporaryPath);
    
            // Save the video details in the database
            $newVideo->title = $request->title;
            $newVideo->course_id = $request->course_id;
            $newVideo->video = $filename;
            $newVideo->save();
    
            // Return the final response after the upload is complete
            return response([
                "video" => $newVideo,
                "success" => true,
            ], 201);
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

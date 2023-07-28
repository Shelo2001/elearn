<?php

namespace App\Models;

use App\Models\User;
use App\Models\Video;
use App\Models\Rating;
use App\Models\Comment;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Course extends Model
{
    use HasFactory;

    protected $fillable=[
        "title",
        "description",
        "duration_minutes",
        "price",
        "category",
        "is_published",
        "user_id",
        "image",
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function rating(){
        return $this->hasMany(Rating::class);
    }

    public function comment(){
        return $this->hasMany(Comment::class);
    }

    public function videos(){
        return $this->hasMany(Video::class);
    }
}

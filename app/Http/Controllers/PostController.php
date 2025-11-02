<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\PostRequest;
use App\Models\PostModel;

class PostController extends Controller
{
    public function index()
    {
       $posts = PostModel::with('user')->get();
       
       return response()->json([
        'data:' => $posts
       ],200);
    }

    public function store(PostRequest $request)
    {
       $id = auth()->id();  
        
        $mediaPath = null;
        $mediaType = null;
    

        if($request->hasFile('media_'))
        {
            $path = $request->file('media_')->store('uploads','public');
            $mediaPath = asset('storage/' . $path);
            $mimeType = $request->file('media_')->getClientMimeType();
            $extension = explode('/', $mimeType)[1];
            $mediaType = in_array($extension, ['jpeg', 'jpg', 'png']) ? 'image' : 'video';
        }



        PostModel::create([
            'title' => "media",
            'description' => $request->description,
            'status' => "em andamento",
            'media_path' => $mediaPath,
            'media_type' => $mediaType,
            'id_user' => $id
        ]);

        return response()->json([
            'id'       => $id,
            'title'    => $request->title,
            'description'  => $request->description,
            'media'    => $mediaPath,
            'type'     => $mediaType
        ],201);

    }

    public function destroy(int $id)
    {
        $post = PostModel::find($id);

        if($post)
        {
            $post->delete();
             return response()->json("post deleted");
        }
        return response()->json("post not found");
    }

    public function show($id)
    {   
        $posts = PostModel::with('user')->find($id);
       
       return response()->json([
        'data:' => $posts
       ],200);
    }

}

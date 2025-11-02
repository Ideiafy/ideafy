<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CommentModel;
use App\Http\Requests\CommentRequest;

class CommentController extends Controller
{
    public function index()
    {
        $comments = CommentModel::with('posts')->get();
       
       return response()->json([
        'data:' => $comments
       ],200);
    }

    public function store(int $idPost, CommentRequest $request)
    {
        $idUser = auth()->id();
      
        CommentModel::create([
            'content' => $request->content,
            'id_post' => $idPost,
            'id_user' => $idUser
        ]);

        return response()->json('comment registered succesfully');
    }

    public function destroy(int $id)
    {
        $comment = CommentModel::find($id);
        
        if($comment)
        {
            $comment->delete();
            return response()->json("comment deleted");
        }

        return response()->json("comment not found");
    }

   
}

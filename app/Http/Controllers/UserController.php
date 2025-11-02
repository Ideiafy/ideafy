<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;
use App\Models\UserModel;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{

    public function index()
    {
        $user = UserModel::all();

        if(!$user)
        {
            return response()->json("user not found");
        }
        
        return response()->json($user);
    }

    public function store(UserRequest $request)
    {

      $request['password'] = Hash::make($request['password']);

      UserModel::create($request->all());
      return response()->json("user registered");
    }

    public function update(int $id,UserRequest $request )
    {
        $data = $request->all();

        $user = UserModel::find($id);

        if(!$user)
        {
            return response()->json("user not found");
        }

        $user->update($data);
        return response()->json($user);

    }

    public function destroy(int $id)
    {
       $user = UserModel::find($id);

        if($user)
        {
            $user->delete();
            return response()->json("user deleted");

        } 

        return response()->json("user not found");
    }

    public function show(string $username)
    {

        $user = UserModel::where('username',$username)->get();

        if(!$user)
        {
            return response()->json("user not found");
        }
        
        return response()->json($user);
    }


    public function getPosts()
    {
        $user = auth()->user();
        $posts = $user->posts()
                  ->with('user')  
                  ->orderBy('created_at', 'desc')
                  ->get();

        return response()->json([
            'data' => $posts
        ]);

        
    }



}

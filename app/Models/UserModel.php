<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
use App\Models\PostModel;
use Illuminate\Foundation\Auth\User as Authenticatable;

class UserModel  extends Authenticatable
{

    use HasApiTokens;

    protected $table = 'users';
    protected $fillable = ['name', 'email', 'password','username'];

    public function posts()
    {
        return $this->hasMany(PostModel::class,'id_user');
    }
}

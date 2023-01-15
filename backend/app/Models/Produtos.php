<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Produtos extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'amount',
        'price',
    ];
    
    use SoftDeletes;
    
    protected $dates = ['deleted_at'];

    public function rules(){
        return  [
        'name' => 'required',
        'description' => 'required',
        'amount' => 'required',
        'price'=> 'required',
        ];
        
    }

    public function feedback(){
        return [
            'required'=> 'O campo :attribute é obrigatório',
        ]; 
    }
}

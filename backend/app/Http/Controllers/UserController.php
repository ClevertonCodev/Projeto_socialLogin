<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;

class UserController extends Controller
{

    public function __construct(User $user)
    {
        $this->User = $user;
    }


    public function index()
    {
        $user = User::all();
        return response()->json($user, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
   

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate($this->User->rules(), $this->User->feedback());

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);

        return response($user, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {   
        $user=User::find($id);
        if ($user == null) {

            return response()->json(['erro' => 'Recurso pesquisado não existe'], 404);
        }
        return response()->json($user, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Produtos  $produtos
     * @return \Illuminate\Http\Response
     */

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {    
       
        $user = $this->User->find($id);


        if ($user === null) {
            return response()->json(['erro' => 'O recurso solicitado não existe'], 404);
        }

        if($request->method() === 'PATCH') {

            $user->update(array_merge(
                $request->only('name', 'email',),
                ['password' => bcrypt($request->password)],
            ));

            return response()->json($user, 200);
            
        }else{

            $request->validate($user->rules(), $user->feedback());
            
            $user->update(array_merge(
                $request->only('name', 'email',),
                ['password' => bcrypt($request->password)],
            ));
            return response()->json($user, 200);
        } 

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::find($id);
        if ($user === null) {
            return response()->json(['erro' => 'Impossível realizar a exclusão. O recurso solicitado não existe'], 404);
        }

        $user->delete();
        return response()->json(['msg' => 'Usuario removido com sucesso!'], 200);
    }
}

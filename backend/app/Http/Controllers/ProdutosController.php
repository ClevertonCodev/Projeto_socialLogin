<?php

namespace App\Http\Controllers;
use App\Models\Produtos;
use Illuminate\Http\Request;

class ProdutosController extends Controller
{
    public function __construct(Produtos $produtos)
    {
        $this->Produtos = $produtos;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $produtos = Produtos::all();
        return response()->json($produtos, 200);
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
        $request->validate($this->Produtos->rules(), $this->Produtos->feedback());
        
       
        $produtos = Produtos::create($request->all());
        return response()->json($produtos, 200);
       
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Produtos  $produtos
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $produtos=Produtos::find($id);
        if ($produtos == null) {

            return response()->json(['erro' => 'Recurso pesquisado não existe'], 404);
        }
        return response()->json($produtos, 200);
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
     * @param  \App\Models\Produtos  $produtos
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate($this->Produtos->rules(), $this->Produtos->feedback());
        
        $produtos=Produtos::find($id);
        $produtos->update($request->all());
        return response()->json($produtos, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Produtos  $produtos
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $produtos = Produtos::find($id);
        if ($produtos === null) {
            return response()->json(['erro' => 'Impossível realizar a exclusão. O recurso solicitado não existe'], 404);
        }

        $produtos->delete();
        return response()->json(['msg' => 'Produto removido com sucesso!'], 200);
    }
}

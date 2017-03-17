<?php

namespace App\Http\Controllers;

use Schema;
use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (request('with')) {
            $query = User::with(request('with'));
        } else {
            $query = new User;
        }

        if (request('fields')) {
            $query = $query->select(request('fields'));
        }

        if (request('q')) {
            $query = $query->where('name', 'like', '%' . request('q') . '%')
                ->orWhere('email', 'like', '%' . request('q') . '%');
        }
        
        if (request('sortBy')) {
            $isDesc = str_contains(request('sortBy'), '-');
            $sortBy = substr(request('sortBy'), $isDesc);
            if (Schema::hasColumn('users', $sortBy)) {
                $query = $query->orderBy($sortBy, $isDesc ? 'desc' : 'asc');
            }
        }

        if (request('page')) {
            $query = $query->paginate(request('perPage') ?? 10);
        } else {
            $query = $query->get();
        }
        
        return response()->json($query);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'email' => 'required|email|unique',
            'password' => 'required',
        ]);

        return response()->json([], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return response()->json($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        //
    }
}

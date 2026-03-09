<?php 

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Users/Index', [
            'users' => User::paginate(10)
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'  => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'role'  => 'required|in:admin,contributor,student',
            'password' => 'required|min:6'
        ]);

        User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'role'     => $request->role,
            'password' => bcrypt($request->password),
        ]);

        return back();
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'role' => 'required|in:admin,contributor,student'
        ]);

        $user->update([
            'role' => $request->role
        ]);

        return back();
    }

    public function destroy(User $user)
{
    // empêcher l'utilisateur connecté de se supprimer lui-même
    if ($user->id == Auth::user()->id) {
        return redirect()->back()->withErrors([
            'error' => "Vous ne pouvez pas supprimer votre propre compte."
        ]);
    }

    $user->delete();

    return redirect()->back()->with('success', 'Utilisateur supprimé avec succès.');
}
}

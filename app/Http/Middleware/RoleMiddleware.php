<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class RoleMiddleware
{
 public function handle($request, Closure $next, ...$roles)
{
    $user = $request->user();

    if (!$user || !in_array($user->role, $roles)) {
        abort(403);
    }

    return $next($request);
}


}

use App\Models\TestResult;
use App\Models\Question;
use Illuminate\Support\Facades\Auth;

public function index()
{
$userId = Auth::id();


// Nombre total de tentatives
$attempts = TestResult::where('user_id', $userId)->count();

// Nombre total de bonnes réponses
$correctAnswers = TestResult::where('user_id', $userId)
->whereNotNull('score')
->sum('score');

// Nombre total de questions trouvées (toutes tentatives confondues)
$totalQuestionsAnswered = TestResult::where('user_id', $userId)
->sum('total');

// Nombre de tentatives par type
$attemptsByType = TestResult::where('user_id', $userId)
->selectRaw('type, COUNT(*) as count')
->groupBy('type')
->get();

return Inertia::render('Dashboard', [
'attempts' => $attempts,
'correctAnswers' => $correctAnswers,
'totalQuestionsAnswered' => $totalQuestionsAnswered,
'attemptsByType' => $attemptsByType,
]);
}
import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Welcome({ auth }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <Head title="Bienvenue - TCF Canada Training" />

            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
                {/* Navigation */}
                <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 justify-between">
                            {/* Logo */}
                            <div className="flex items-center">
                                <Link href="/" className="flex items-center space-x-2">
                                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">TCF Canada</span>
                                    <span className="text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">Training</span>
                                </Link>
                            </div>

                            {/* Desktop Navigation - version fournie */}
                            <div className="hidden sm:flex sm:items-center sm:justify-end sm:flex-1">
                                <div className="-mx-3 flex flex-1 justify-end">
                                    {auth.user ? (
                                        <Link
                                            href={route('dashboard')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Dashboard
                                        </Link>
                                    ) : (
                                        <>
                                            <Link
                                                href={route('login')}
                                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                            >
                                                Log in
                                            </Link>
                                            <Link
                                                href={route('register')}
                                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                            >
                                                Register
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Mobile menu button */}
                            <div className="flex items-center sm:hidden">
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                                >
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        {isMenuOpen ? (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        ) : (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                        )}
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Mobile Menu */}
                        {isMenuOpen && (
                            <div className="sm:hidden py-4 space-y-2 border-t border-gray-200 dark:border-gray-700">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="block py-2 text-blue-600 dark:text-blue-400 font-medium"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="block py-2 text-blue-600 dark:text-blue-400 font-medium"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </nav>

                {/* Hero Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
                            Préparez-vous au{' '}
                            <span className="text-blue-600 dark:text-blue-400">TCF Canada</span>
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
                            La plateforme complète pour réussir votre examen TCF Canada. 
                            Exercices pratiques, tests blancs et suivi personnalisé de votre progression.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            {!auth.user ? (
                                <>
                                    <Link
                                        href={route('register')}
                                        className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
                                    >
                                        Commencer gratuitement
                                    </Link>
                                    <Link
                                        href="/demo"
                                        className="bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-blue-600 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 transition"
                                    >
                                        Essayer la démo
                                    </Link>
                                </>
                            ) : (
                                <Link
                                    href={route('dashboard')}
                                    className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
                                >
                                    Accéder à mon tableau de bord
                                </Link>

                            )}
                            
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="bg-white dark:bg-gray-800 py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            <div>
                                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">5000+</div>
                                <div className="text-gray-600 dark:text-gray-300">Étudiants formés</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">95%</div>
                                <div className="text-gray-600 dark:text-gray-300">Taux de réussite</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">1000+</div>
                                <div className="text-gray-600 dark:text-gray-300">Exercices disponibles</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Grid (identique à avant) */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
                        Tout ce dont vous avez besoin pour réussir
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Exercices pratiques</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Des centaines d'exercices couvrant toutes les sections du TCF Canada : 
                                compréhension orale, écrite et expression.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Tests blancs chronométrés</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Simulez les conditions réelles de l'examen avec nos tests chronométrés 
                                et évaluez votre progression.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Suivi personnalisé</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Visualisez votre progression avec des statistiques détaillées et 
                                identifiez vos points faibles.
                            </p>
                        </div>

                        {/* Feature 4 */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Support audio inclus</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Accédez à des enregistrements de qualité pour vous entraîner 
                                à la compréhension orale dans des conditions réelles.
                            </p>
                        </div>

                        {/* Feature 5 */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Communauté active</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Échangez avec d'autres candidats, partagez vos astuces et 
                                progressez ensemble.
                            </p>
                        </div>

                        {/* Feature 6 */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Certification officielle</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Préparez-vous avec du contenu aligné sur les exigences officielles 
                                du TCF Canada.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Pricing Section */}
<div className="bg-white dark:bg-gray-800 py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Nos formules adaptées à vos besoins
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
                Choisissez le plan qui vous convient et commencez votre préparation dès aujourd'hui
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Plan Basic */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-8 shadow-lg hover:shadow-xl transition">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Basic</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">Pour débuter en douceur</p>
                <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">15 000</span>
                    <span className="text-xl text-gray-600 dark:text-gray-300"> FCFA</span>
                    <span className="text-gray-600 dark:text-gray-300">/mois</span>
                </div>
                <ul className="space-y-4 mb-8">
                    <li className="flex items-center text-gray-700 dark:text-gray-200">
                        <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Accès à 200 exercices
                    </li>
                    <li className="flex items-center text-gray-700 dark:text-gray-200">
                        <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Tests blancs limités (2/mois)
                    </li>
                    <li className="flex items-center text-gray-700 dark:text-gray-200">
                        <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Suivi de progression basique
                    </li>
                    <li className="flex items-center text-gray-500 dark:text-gray-400">
                        <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Support prioritaire
                    </li>
                </ul>
                <Link
                    href={route('register')}
                    className="block text-center bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-400 rounded-lg px-6 py-3 font-semibold hover:bg-blue-50 dark:hover:bg-gray-700 transition"
                >
                    Commencer
                </Link>
            </div>

            {/* Plan Standard (recommandé) */}
            <div className="bg-blue-600 dark:bg-blue-700 rounded-2xl p-8 shadow-xl hover:shadow-2xl transform scale-105 relative">
                <div className="absolute top-0 right-0 bg-yellow-400 text-gray-900 text-sm font-bold px-4 py-1 rounded-bl-lg rounded-tr-lg">
                    Populaire
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Standard</h3>
                <p className="text-blue-100 mb-6">Le choix de la majorité</p>
                <div className="mb-6">
                    <span className="text-4xl font-bold text-white">25 000</span>
                    <span className="text-xl text-blue-100"> FCFA</span>
                    <span className="text-blue-100">/mois</span>
                </div>
                <ul className="space-y-4 mb-8">
                    <li className="flex items-center text-white">
                        <svg className="w-5 h-5 text-yellow-300 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Accès à 500 exercices
                    </li>
                    <li className="flex items-center text-white">
                        <svg className="w-5 h-5 text-yellow-300 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Tests blancs illimités
                    </li>
                    <li className="flex items-center text-white">
                        <svg className="w-5 h-5 text-yellow-300 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Suivi de progression avancé
                    </li>
                    <li className="flex items-center text-white">
                        <svg className="w-5 h-5 text-yellow-300 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Support prioritaire
                    </li>
                </ul>
                <Link
                    href={route('register')}
                    className="block text-center bg-white text-blue-600 rounded-lg px-6 py-3 font-semibold hover:bg-blue-50 transition"
                >
                    Choisir Standard
                </Link>
            </div>

            {/* Plan Premium */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-8 shadow-lg hover:shadow-xl transition">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Premium</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">Pour une préparation intensive</p>
                <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">50 000</span>
                    <span className="text-xl text-gray-600 dark:text-gray-300"> FCFA</span>
                    <span className="text-gray-600 dark:text-gray-300">/mois</span>
                </div>
                <ul className="space-y-4 mb-8">
                    <li className="flex items-center text-gray-700 dark:text-gray-200">
                        <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Accès à tous les exercices (1000+)
                    </li>
                    <li className="flex items-center text-gray-700 dark:text-gray-200">
                        <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Tests blancs illimités + corrections détaillées
                    </li>
                    <li className="flex items-center text-gray-700 dark:text-gray-200">
                        <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Coaching personnalisé (1h/semaine)
                    </li>
                    <li className="flex items-center text-gray-700 dark:text-gray-200">
                        <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Support VIP 24/7
                    </li>
                </ul>
                <Link
                    href={route('register')}
                    className="block text-center bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-400 rounded-lg px-6 py-3 font-semibold hover:bg-blue-50 dark:hover:bg-gray-700 transition"
                >
                    Choisir Premium
                </Link>
            </div>
        </div>

        {/* Note sur les prix */}
        <p className="text-center text-gray-600 dark:text-gray-400 mt-8 text-sm">
            * Tous les prix sont en FCFA (Franc CFA). Pas d'engagement, résiliable à tout moment.
        </p>
    </div>
</div>

                {/* CTA Section */}
                <div className="bg-blue-600 dark:bg-blue-800 py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Prêt à commencer votre préparation ?
                        </h2>
                        <p className="text-blue-100 text-lg mb-8">
                            Rejoignez des milliers d'étudiants qui ont réussi le TCF Canada grâce à notre plateforme.
                        </p>
                        {!auth.user ? (
                            <Link
                                href={route('register')}
                                className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition inline-block shadow-lg"
                            >
                                Créer un compte gratuit
                            </Link>
                        ) : (
                            <Link
                                href={route('dashboard')}
                                className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition inline-block shadow-lg"
                            >
                                Accéder à mon espace
                            </Link>
                        )}
                    </div>
                </div>

                {/* Footer (simplifié, avec dark mode) */}
                <footer className="bg-gray-50 dark:bg-gray-900 py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">TCF Canada Training</h4>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    La meilleure plateforme pour réussir votre TCF Canada.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Liens utiles</h4>
                                <ul className="space-y-2 text-sm">
                                    <li><Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">À propos</Link></li>
                                    <li><Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Contact</Link></li>
                                    <li><Link href="/faq" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">FAQ</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Légal</h4>
                                <ul className="space-y-2 text-sm">
                                    <li><Link href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Conditions d'utilisation</Link></li>
                                    <li><Link href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Politique de confidentialité</Link></li>
                                    <li><Link href="/cookies" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Cookies</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Suivez-nous</h4>
                                <div className="flex space-x-4">
                                    <a href="#" className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                                        <span className="sr-only">Facebook</span>
                                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                    <a href="#" className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                                        <span className="sr-only">Twitter</span>
                                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-600 dark:text-gray-400">
                            &copy; {new Date().getFullYear()} crée par Josue Elnathan Mbondo. Tous droits réservés.
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
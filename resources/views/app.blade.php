<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'MEN STORE') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @php
            $manifestPath = public_path('build/manifest.json');
            if (file_exists($manifestPath)) {
                $manifest = json_decode(file_get_contents($manifestPath), true);
                echo "<!-- Manifest found: " . json_encode($manifest) . " -->";
            } else {
                echo "<!-- Manifest not found at: $manifestPath -->";
            }
        @endphp

        @viteReactRefresh
        @vite(['resources/js/app.tsx', 'resources/scss/app.scss'])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia

        @if(config('app.debug'))
            <script>
                window.addEventListener('error', function(e) {
                    console.error('JavaScript Error:', e.message);
                });
            </script>
        @endif
    </body>
</html>

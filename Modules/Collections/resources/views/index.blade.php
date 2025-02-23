@extends('collections::layouts.master')

@section('content')
    <h1>Hello World</h1>

    <p>Module: {!! config('collections.name') !!}</p>
@endsection

@extends('location::layouts.master')

@section('content')
    <h1>Hello World1</h1>

    <p>Module: {!! config('location.name') !!}</p>
@endsection

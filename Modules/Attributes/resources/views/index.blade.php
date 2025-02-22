@extends('attributes::layouts.master')

@section('content')
    <h1>Hello World</h1>

    <p>Module: {!! config('attributes.name') !!}</p>
@endsection

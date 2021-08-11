@component('mail::message')
# WelCome to {{config('app.name')}}

For activating your account, please click on the button.

@component('mail::button', ['url' => ''])
Active Account
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent

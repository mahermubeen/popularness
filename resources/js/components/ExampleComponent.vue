<template>
    <div class="container">
        <div class="text-center my-5">
                <a href="#" class="btn btn-primary">Home</a>
                <a href="login" class="btn btn-primary">Login</a>
                <a href="#" class="btn btn-primary">Register</a>
                <a href="#" class="btn btn-primary">Welcome</a>
                ||
                <router-link to="/dashboard" class="btn btn-primary">Dashboard</router-link>
                <router-link to="/profile" class="btn btn-primary">Profile</router-link>
            </div>
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Example Component</div>

                    <div class="card-body">
                        I'm an example component.
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>

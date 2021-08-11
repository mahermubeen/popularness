<template>
    <div>
        <input type="file" @change="uploadFile(fieldName, $event.target.files)">
    </div>
</template>

<script>
    import S3 from 'aws-s3';
    
    export default {
        props: ['fieldName', 'directory'],
        computed: {
            config(){
                return {
                    bucketName: 'popularness-static',
                    dirName: this.env + '/user/' + this.directory,
                    region: 'us-east-1',
                    accessKeyId: this.secret.id,
                    secretAccessKey: this.secret.secret,
                    s3Url: this.baseUrl, /* optional */
                }
            },
            S3Client() {
                return new S3(this.config);
            },
            baseUrl() {
                return process.env.MIX_AWS_S3_URL
            },
            newFileName() {
                return Math.random().toString().slice(2)
            },
            url() {
                return `${this.baseUrl}/${this.config.dirName}/${this.newFileName}`
            },
            env() {
                return process.env.MIX_APP_ENV
            },
            secret() {
                return {
                    id: process.env.MIX_AWS_ACCESS_KEY_ID,
                    secret: process.env.MIX_AWS_SECRET_ACCESS_KEY
                }
            }
        },
        methods: {
            uploadFile(fieldName, files) {
                let file = files[0]
                console.log(this.url);
                this.S3Client
                    .uploadFile(file, this.newFileName)
                    .then(data => console.log(data))
                    .catch(err => console.error(err))
                    .finally(() => {
                        let fileExtension = file.type.split('/',)[1]
                        // this.obj[fieldName] = `${this.url}.${fileExtension}`
                        console.log(`${this.url}.${fileExtension}`);
                        // this.$emit('fileUploaded', `${this.url}.${fileExtension}`)
                        this.$emit('fileUploaded', {url: `${this.url}.${fileExtension}`})
                    })
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>
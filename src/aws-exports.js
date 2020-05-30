const awsmobile = {
    "aws_project_region": "ap-northeast-1",
    "aws_cognito_region": "ap-northeast-1",
    "aws_user_pools_id": "<cognito-user-pool-id>",
    "aws_user_pools_web_client_id": "<client-id>",
    "oauth": {
        "domain": "domain.auth.ap-northeast-1.amazoncognito.com",
        "scope": [
            "phone",
            "email",
            "openid",
            "profile",
            "aws.cognito.signin.user.admin"
        ],
        "redirectSignIn": "http://localhost:4200/login",
        "redirectSignOut": "http://localhost:4200/login",
        "responseType": "code"
    },
    "aws_appsync_graphqlEndpoint": "https://<random>.appsync-api.ap-northeast-1.amazonaws.com/graphql",
    "aws_appsync_region": "ap-northeast-1",
    "aws_appsync_authenticationType": "AMAZON_COGNITO_USER_POOLS",
    "aws_pubsub_region":"ap-northeast-1"
};


export default awsmobile;